import React from 'react';

import {Message as MessageInterface} from "ai";

import {Card, ColorMode, Flex, useColorMode} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

import {SlOptionsVertical} from "react-icons/sl";
import {MdQuestionAnswer} from "react-icons/md";
import {FaLeaf, FaQuestion} from "react-icons/fa";
import {BsFillLightbulbFill} from "react-icons/bs";

// @ts-ignore
import jsonAutocomplete from "json-autocomplete";

import StudyGuide from "@/components/taskChat/Message/StudyGuide";
import MultipleChoiceQuestion from "@/components/taskChat/Message/MultipleChoiceQuestion";
import TextBasedQuestion from "@/components/taskChat/Message/TextBasedQuestion";
import TextMessage from "@/components/taskChat/Message/TextMessage";
import QuestionCorrectness from "@/components/taskChat/Message/QuestionCorrectness";
import ActionPrompt from "@/components/taskChat/Message/ActionPrompt";
import Hint from "@/components/taskChat/Message/Hint";

import {
    answerCorrectnessDefaults,
    applicationQuestionCommand,
    CommandTags,
    hintCommand,
    multipleChoiceCommand,
    parseResponse,
    ResponseTags,
    studyGuideCommand,
    understandingQuestionCommand
} from "@/llm/prompts/commands";

import {Command} from "@/types/commands/Command";
import DontKnow from "@/components/taskChat/Message/DontKnow";
import {AnswerStates} from "@/hooks/task/useTaskChat";

interface Props {
    message: MessageInterface,
    promptWithCommand: (command: Command<any>) => void,
    answerState?: AnswerStates
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

const Message: React.FC<Props> = ({ message, promptWithCommand, answerState }) => {

    const { colorMode } = useColorMode();

    return (
        <Flex
            justifyContent={getRoleJustifyContent(message.role)}
            w="100%"
        >
            <Card
                maxW={'95%'}
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
                    getMessageComponent(message, promptWithCommand, answerState !== undefined)
                }
            </Card>
        </Flex>
    );
};

const getMessageComponent = (
    message: MessageInterface,
    promptWithCommand: (command: Command<any>) => void,
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
        case ResponseTags.STUDY_GUIDE:
            return (
                <StudyGuide
                    studyGuide={parseResponse(studyGuideCommand, content)}
                />
            );
        case ResponseTags.MULTIPLE_CHOICE:
            return (
                <MultipleChoiceQuestion
                    question={parseResponse(multipleChoiceCommand, content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.UNDERSTANDING:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(understandingQuestionCommand, content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.APPLICATION:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(applicationQuestionCommand, content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.ANSWER_CORRECTNESS:
            return (
                <QuestionCorrectness
                    correctness={parseResponse(answerCorrectnessDefaults, content)}
                />
            );
        case ResponseTags.HINT:
            return (
                <Hint
                    hint={parseResponse(hintCommand, content)}
                />
            );
        case ResponseTags.DONT_KNOW:
            return (
                <DontKnow
                    dontKnow={content}
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
                />
            )
    }
}

const parseResponseJson = (response: string) => {
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}');
    return JSON.parse(response.substring(jsonStart, jsonEnd + 1));
}


export default Message;
