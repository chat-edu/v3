import {FormEvent, useEffect, useMemo, useState} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import {taskIntroductionMessage} from "@/llm/prompts/tasks/taskIntroduction";
import {questionResponseTagSuffix, ResponseTags} from "@/llm/prompts/commands/tags";
import {answerCorrectnessCommand, getPrompt, plainTextCommand} from "@/llm/prompts/commands";
import {taskSystemMessage} from "@/llm/prompts/tasks/systemMessage";

import {Command, CommandTypes} from "@/types/commands/Command";
import {Topic} from "@/types/graph/Topic";
import {Task} from "@/types/Task";

export enum AnswerStates {
    CORRECT,
    INCORRECT,
    DONT_KNOW
}

const useChatEdu = (task: Task, topics: Topic[]) => {

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
            await append({
                id: nanoid(),
                content: JSON.stringify({
                    tag: ResponseTags.SYSTEM,
                    content: "Ask me another question"
                }),
                role: 'user',
            })
        }
        // If the message is an "I don't know" response, set the answer mapping
        else if(message.content.includes(ResponseTags.DONT_KNOW)) {
            setAnswerMapping({
                ...answerMapping,
                [currentQuestion?.id || ""]: AnswerStates.DONT_KNOW
            })
            setCurrentQuestion(null);
        }
        scrollToBottom();
    }

    const scrollToBottom = () => {
        if (!messageBottomRef) return;
        messageBottomRef.scroll({
            top: messageBottomRef.scrollHeight,
            behavior: 'auto'
        })
    }

    const {
        messages,
        input,
        setInput,
        handleInputChange,
        append,
        stop,
        isLoading
    } = useChat({
        api: `/api/tasks/${task.id}/chat`,
        body: {
            systemInstruction: taskSystemMessage(task, topics),
        },
        onFinish,
    });

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    useEffect(() => {
        setCurrentQuestion(null);
        setAnswerMapping({});
        setPromptType(CommandTypes.REGULAR)
        append({
            id: nanoid(),
            content: JSON.stringify({
                tag: ResponseTags.SYSTEM,
                content: taskIntroductionMessage(task, topics)
            }),
            role: 'user',
        })
    }, [task]);

    const promptWithCommand = async (command: Command<any>) => {
        if(command.promptType === CommandTypes.DONT_KNOW) {
            setCurrentQuestion(null);
            setPromptType(CommandTypes.REGULAR)
        } else if(command.promptType !== CommandTypes.HINT) {
            setPromptType(command.promptType);
        }
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
    }

    const displayMessages = useMemo(() => {
        // trim the content of the messages from the first { to the last }
        // if the first { does not exist, return an empty string
        return messages.map((message) => {
            const firstBracketIndex = message.content.indexOf('{');
            const lastBracketIndex = message.content.lastIndexOf('}');
            if(firstBracketIndex !== -1) {
                if(lastBracketIndex !== -1) message.content = message.content.substring(firstBracketIndex, lastBracketIndex + 1);
                else message.content = message.content.substring(firstBracketIndex);
            }
            return message;
        }).filter((message) => (message.role !== 'system' && !message.content.includes(ResponseTags.SYSTEM)));
    }, [messages]);

    return {
        messages: displayMessages,
        input,
        promptType,
        answerMapping,
        isLoading,
        handleInputChange,
        onSubmit,
        promptWithCommand,
        setMessageBottomRef,
        stop
    };
}

export default useChatEdu;