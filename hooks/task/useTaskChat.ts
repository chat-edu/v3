import {FormEvent, useEffect, useRef, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import {useTaskContext} from "@/contexts/TaskContext";

import {CommandTags, questionResponseTagSuffix, ResponseTags} from "@/llm/prompts/commands/tags";
import {
    answerCorrectnessCommand, applicationQuestionCommand,
    getPrePrompt,
    getPrompt,
    multipleChoiceCommand,
    plainTextCommand, understandingQuestionCommand
} from "@/llm/prompts/commands";
import {taskSystemMessage} from "@/llm/prompts/tasks/systemMessage";
import {agentIntroduction} from "@/llm/prompts/tasks/agentIntroduction";
import {topicSystemMessage} from "@/llm/prompts/tasks/topicSystemMessage";

import {Command, CommandTypes} from "@/types/commands/Command";
import useImageInput from "@/hooks/utilities/useImageInput";
import {addQuestionFromMessage} from "@/services/api/questions";
import useAuth from "@/hooks/useAuth";
import {taskComplete} from "@/llm/prompts/tasks/taskCompletePrompt";

export enum AnswerStates {
    CORRECT,
    INCORRECT,
    DONT_KNOW
}

const useTaskChat = () => {

    const { user } = useAuth();

    const {
        currentTopicIndex,
        setCurrentTopicIndex,
        correctAnswersByTopic,
        setCorrectAnswersByTopic,
        task,
        taskTopics,
    } = useTaskContext()

    const [promptType, setPromptType] = useState<CommandTypes>(CommandTypes.REGULAR);

    const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);
    const currentAnswer = useRef<string | null>(null);

    const [answerMapping, setAnswerMapping] = useState<{[key: string]: AnswerStates}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const [messageImages, setMessageImages] = useState<{[key: string]: string[]}>({});

    const {
        images,
        handleImagesChange,
        resetImages,
        removeImage
    } = useImageInput();

    const onFinish = async (message: Message) => {
        // If the message is a question, set it as the current question
        if(!currentQuestion && message.content.includes(`${questionResponseTagSuffix}`)) {
            setCurrentQuestion(message);
        }
        // If the message is an answer correctness response, set the answer mapping
        else if(message.content.includes(ResponseTags.ANSWER_CORRECTNESS)) {
            if(!currentQuestion || !user) return;
            const correct = JSON.parse(message.content).content.correct;
            setAnswerMapping({
                ...answerMapping,
                [currentQuestion.id || ""]: correct ? AnswerStates.CORRECT : AnswerStates.INCORRECT
            })
            if(currentAnswer.current) {
                addQuestionFromMessage(
                    user.id,
                    taskTopics[currentTopicIndex].id,
                    task.id,
                    currentQuestion,
                    currentAnswer.current,
                    message
                )
            }
            setCurrentQuestion(null);
            currentAnswer.current = null;
            setCorrectAnswersByTopic([
                ...correctAnswersByTopic.slice(0, currentTopicIndex),
                correct ? correctAnswersByTopic[currentTopicIndex] + 1 : 0,
                ...correctAnswersByTopic.slice(currentTopicIndex + 1)
            ])
        }
        // If the message is an "I don't know" response, set the answer mapping
        else if(message.content.includes(ResponseTags.DONT_KNOW)) {
            setAnswerMapping({
                ...answerMapping,
                [currentQuestion?.id || ""]: AnswerStates.DONT_KNOW
            })
            setCurrentQuestion(null);
            setCorrectAnswersByTopic([
                ...correctAnswersByTopic.slice(0, currentTopicIndex),
                0,
                ...correctAnswersByTopic.slice(currentTopicIndex + 1)
            ])
        }
        scrollToBottom();
    }

    const {
        messages,
        setMessages,
        input,
        setInput,
        handleInputChange,
        append,
        stop,
        isLoading
    } = useChat({
        api: `/api/tasks/${task.id}/chat`,
        body: {
            systemInstruction: taskSystemMessage(task, taskTopics),
            images
        },
        onFinish,
    });

    useEffect(() => {
        setMessages([
            {
                id: nanoid(),
                content: taskSystemMessage(task, taskTopics),
                role: 'system',
            },
            {
                id: nanoid(),
                content: JSON.stringify({
                    tag: ResponseTags.PLAIN_TEXT,
                    content: agentIntroduction(task, taskTopics)
                }),
                role: 'assistant',
            },
            {
                id: nanoid(),
                content: topicSystemMessage(task, taskTopics[currentTopicIndex]),
                role: 'system',
            }
        ])
        setCurrentQuestion(null);
        setAnswerMapping({});
        setPromptType(CommandTypes.REGULAR);
    }, [task]);

    useEffect(() => {
        if(correctAnswersByTopic[currentTopicIndex] === 3) {
            if(currentTopicIndex < taskTopics.length - 1) { setCurrentTopicIndex(currentTopicIndex + 1); }
            else {
                setMessages([
                    ...messages,
                    {
                        role: 'assistant',
                        id: nanoid(),
                        content:  JSON.stringify({
                            tag: ResponseTags.PLAIN_TEXT,
                            content: taskComplete(task)
                        })
                    }
                ]);
            }
        }
    }, [correctAnswersByTopic]);

    const nextQuestion = async () => {
        switch (correctAnswersByTopic[currentTopicIndex]) {
            case 0:
                await promptWithCommand(multipleChoiceCommand(taskTopics[currentTopicIndex].name));
                break;
            case 1:
                await promptWithCommand(understandingQuestionCommand(taskTopics[currentTopicIndex].name));
                break;
            case 2:
                await promptWithCommand(applicationQuestionCommand(taskTopics[currentTopicIndex].name));
                break;
        }
    }

    const skipTopic = async () => {
        setCurrentTopicIndex(currentTopicIndex + 1);
    }

    useEffect(() => {
        if(currentTopicIndex === 0) return;
        setMessages([
            ...messages,
            {
                role: 'assistant',
                id: nanoid(),
                content: JSON.stringify({
                    tag: ResponseTags.NEXT_TOPIC,
                    content: taskTopics[currentTopicIndex].name
                })
            },
            {
                role: 'system',
                id: nanoid(),
                content: topicSystemMessage(task, taskTopics[currentTopicIndex])
            }
        ]);
    }, [currentTopicIndex]);

    const scrollToBottom = () => {
        if (!messageBottomRef) return;
        messageBottomRef.scroll({
            top: messageBottomRef.scrollHeight,
            behavior: 'auto'
        })
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const promptWithCommand = async (command: Command<any>) => {
        if(command.promptType === CommandTypes.DONT_KNOW) {
            setCurrentQuestion(null);
            setPromptType(CommandTypes.REGULAR)
        } else if(command.promptType !== CommandTypes.HINT) {
            setPromptType(command.promptType);
        }
        if(command.promptTag === CommandTags.ANSWER_CORRECTNESS) {
            currentAnswer.current = command.promptContent;
        }
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: getPrePrompt(command),
                role: 'system',
            }
        ])
        const newMessageId = nanoid();
        if(images.length > 0) {
            setMessageImages({
                ...messageImages,
                [newMessageId]: images
            })
        }
        await append({
            id: newMessageId,
            content: JSON.stringify(getPrompt(command)),
            role: 'user',
        });
        resetImages();
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await promptWithCommand(promptType == CommandTypes.TEXT_BASED
            ? answerCorrectnessCommand(currentQuestion?.content || "", input)
            : plainTextCommand(input));
        setInput('');
        setPromptType(CommandTypes.REGULAR);
    }

    return {
        messages: messages.filter((message) => (message.role !== 'system')),
        input,
        promptType,
        answerMapping,
        isLoading,
        handleInputChange,
        setInput,
        onSubmit,
        promptWithCommand,
        setMessageBottomRef,
        stop,
        nextQuestion,
        skipTopic,
        images,
        handleImagesChange,
        resetImages,
        removeImage,
        messageImages
    };
}

export default useTaskChat;