import {FormEvent, useEffect, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import {useTaskContext} from "@/contexts/TaskContext";

import {questionResponseTagSuffix, ResponseTags} from "@/llm/prompts/commands/tags";
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

export enum AnswerStates {
    CORRECT,
    INCORRECT,
    DONT_KNOW
}

const useTaskChat = () => {

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

    const [answerMapping, setAnswerMapping] = useState<{[key: string]: AnswerStates}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const onFinish = async (message: Message) => {
        // If the message is a question, set it as the current question
        if(!currentQuestion && message.content.includes(`${questionResponseTagSuffix}`)) {
            setCurrentQuestion(message);
        }
        // If the message is an answer correctness response, set the answer mapping
        else if(message.content.includes(ResponseTags.ANSWER_CORRECTNESS)) {
            const correct = JSON.parse(message.content).content.correct;
            setAnswerMapping({
                ...answerMapping,
                [currentQuestion?.id || ""]: correct ? AnswerStates.CORRECT : AnswerStates.INCORRECT
            })
            setCurrentQuestion(null);
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
        setCorrectAnswersByTopic([0]);
    }, [task]);

    useEffect(() => {
        if(correctAnswersByTopic.length === 0) return;
        if(correctAnswersByTopic[currentTopicIndex] === 3) {
            setCurrentTopicIndex(currentTopicIndex + 1);
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
        if(currentTopicIndex === 0 || currentTopicIndex === taskTopics.length) return;
        setMessages([
            ...messages,
            {
                role: 'system',
                id: nanoid(),
                content: topicSystemMessage(task, taskTopics[currentTopicIndex])
            }
        ]);
        setCorrectAnswersByTopic([...correctAnswersByTopic, 0]);
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
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: getPrePrompt(command),
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: JSON.stringify(getPrompt(command)),
            role: 'user',
        });
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
        onSubmit,
        promptWithCommand,
        setMessageBottomRef,
        stop,
        nextQuestion,
        skipTopic
    };
}

export default useTaskChat;