import React from 'react';

import {Message as MessageInterface} from "ai";

import {Card, ColorMode, Flex, HStack, useColorMode} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

import {SlOptionsVertical} from "react-icons/sl";
import {MdQuestionAnswer} from "react-icons/md";
import {FaLeaf, FaQuestion} from "react-icons/fa";
import {BsFillLightbulbFill} from "react-icons/bs";

// @ts-ignore
import jsonAutocomplete from "json-autocomplete";

import MultipleChoiceQuestion from "@/components/task/TaskChat/Message/MultipleChoiceQuestion";
import TextBasedQuestion from "@/components/task/TaskChat/Message/TextBasedQuestion";
import TextMessage from "@/components/task/TaskChat/Message/TextMessage";
import QuestionCorrectness from "@/components/task/TaskChat/Message/QuestionCorrectness";
import ActionPrompt from "@/components/task/TaskChat/Message/ActionPrompt";
import Hint from "@/components/task/TaskChat/Message/Hint";

import {
    CommandTags,
    parseResponse,
    ResponseTags,
} from "@/llm/prompts/commands";

import {Command} from "@/types/commands/Command";
import DontKnow from "@/components/task/TaskChat/Message/DontKnow";
import {AnswerStates} from "@/hooks/task/useTaskChat";
import MessageImage from "@/components/task/TaskChat/Message/MessageImage";

interface Props {
    message: MessageInterface,
    promptWithCommand: (command: Command<any>) => void,
    answerState?: AnswerStates,
    skipTopic: () => void,
    nextQuestion: () => void,
    images?: string[]
}

const getRoleBgColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return transparentize(colorMode === 'light' ? 'brand.200' : 'brand.300', 0.3);
        case 'assistant':
            return undefined
        default:
            return 'gray.500';
    }
}

const getRoleJustifyContent = (role: string) => {
    switch (role) {
        case 'user':
            return 'flex-end';  // Align to the right
        case 'assistant':
            return 'flex-start'; // Align to the left
        default:
            return 'center';
    }
}

const Message: React.FC<Props> = ({ message, promptWithCommand, answerState, skipTopic, nextQuestion, images }) => {

    const { colorMode } = useColorMode();

    return (
        <Flex
            justifyContent={getRoleJustifyContent(message.role)}
            w="100%"
        >
            <Flex
                maxW={'95%'}
                flexDirection={'column'}
            >
                {
                    images && images.length > 0 ? (
                        <HStack
                            spacing={2}
                            mb={2}
                            justifyContent={getRoleJustifyContent(message.role)}
                        >
                            {
                                images.map((image, index) => (
                                    <MessageImage
                                        src={image}
                                        key={index}
                                    />
                                ))
                            }
                        </HStack>
                    ) : null
                }
                <Card
                    borderColor={answerState === undefined
                        ? undefined
                        : answerState === AnswerStates.CORRECT
                            ? 'brand.500'
                            : answerState == AnswerStates.INCORRECT
                                ? 'red.500'
                                : 'gray.500'
                    }
                    borderWidth={answerState === undefined ? undefined : 2}
                    // @ts-ignore
                    bg={getRoleBgColor(message.role, colorMode)}
                >
                    {
                        getMessageComponent(message, promptWithCommand, skipTopic, nextQuestion, answerState !== undefined)
                    }
                </Card>
            </Flex>
        </Flex>
    );
};

const getMessageComponent = (
    message: MessageInterface,
    promptWithCommand: (command: Command<any>) => void,
    skipTopic: () => void,
    nextQuestion: () => void,
    answered: boolean
) => {
    let tag: string;
    let content: any;
    try {
        let parsed;
        try {
            parsed = JSON.parse(message.content);
        } catch (e) {
            parsed = JSON.parse(jsonAutocomplete(message.content) as string);
        }
        tag = parsed.tag;
        content = parsed.content;
    } catch (e) {
        return null;
    }
    if(!content) return null;
    switch (tag) {
        case ResponseTags.MULTIPLE_CHOICE:
            return (
                <MultipleChoiceQuestion
                    question={parseResponse(content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.UNDERSTANDING:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.APPLICATION:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.ANSWER_CORRECTNESS:
            return (
                <QuestionCorrectness
                    correctness={parseResponse(content)}
                />
            );
        case ResponseTags.HINT:
            return (
                <Hint
                    hint={parseResponse(content)}
                />
            );
        case ResponseTags.DONT_KNOW:
            return (
                <DontKnow
                    dontKnow={content}
                />
            );
        case ResponseTags.NEXT_TOPIC:
            return (
                <ActionPrompt
                    title={content}
                    icon={BsFillLightbulbFill}
                />
            );
        case CommandTags.HINT:
            return (
                <ActionPrompt
                    title={"Hint"}
                    icon={BsFillLightbulbFill}
                />
            );
        case CommandTags.MULTIPLE_CHOICE:
            return (
                <ActionPrompt
                    title={"Multiple Choice Question"}
                    icon={SlOptionsVertical}
                />
            );
        case CommandTags.STUDY_GUIDE:
            return (
                <ActionPrompt
                    title={"Study Guide"}
                    icon={FaLeaf}
                />
            );
        case CommandTags.UNDERSTANDING:
            return (
                <ActionPrompt
                    title={"Understanding Question"}
                    icon={MdQuestionAnswer}
                />
            );
        case CommandTags.APPLICATION:
            return (
                <ActionPrompt
                    title={"Application Question"}
                    icon={MdQuestionAnswer}
                />
            );
        case CommandTags.ANSWER_CORRECTNESS:
            return (
                <TextMessage content={(content || "").trim()} />
            );
        case CommandTags.DONT_KNOW:
            return (
                <ActionPrompt
                    title={"Don't Know"}
                    icon={FaQuestion}
                />
            );
        default:
            return (
                <TextMessage
                    content={content}
                    showTextToSpeech={message.role === 'assistant'}
                />
            )
    }
}


export default Message;
