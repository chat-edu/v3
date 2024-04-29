import React, {ChangeEventHandler} from 'react';

import {
    Button,
    Card,
    Flex,
    FormControl,
    HStack,
    IconButton,
    Text,
    Textarea,
    Tooltip,
    useColorModeValue
} from "@chakra-ui/react";

import {FaStopCircle} from "react-icons/fa";

import {AnswerStates} from "@/hooks/task/useTaskChat";

import {Command, CommandTypes} from "@/types/commands/Command";
import {useTaskContext} from "@/contexts/TaskContext";

interface Props {
    value: string,
    isLoading: boolean,
    stop: () => void,
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    promptWithCommand: (command: Command<any>) => void,
    promptType: CommandTypes
    showMessage: boolean;
    answerMapping: { [key: string]: AnswerStates };
    nextQuestion: () => void;
    skipTopic: () => void;
}

const InputBox: React.FC<Props> = ({ value, isLoading, stop, handleChange, handleSubmit, nextQuestion, skipTopic, promptType  }) => {

    const { taskTopics, currentTopicIndex, correctAnswersByTopic } = useTaskContext();

    const inputBoxColor = useColorModeValue("white", "#2D2D2D");

    const numCorrect = correctAnswersByTopic[currentTopicIndex];

    return (
        <Flex
           flexDirection={'column'}
           gap={{
               base: 2,
               md: 4
           }}
           position={'sticky'}
           bottom={0}
           right={0}
           pt={4}
        >
            <Card
                bg={inputBoxColor}
                roundedBottom={{
                    base: 'none',
                    md: 'md'
                }}
                roundedTop={'md'}
                gap={2}
            >
                <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                >
                    Current Topic: {taskTopics[currentTopicIndex].name} ({numCorrect}/3)
                </Text>
                <Text>
                    {
                        promptType === CommandTypes.TEXT_BASED
                            ? 'Answer the question below.'
                            : promptType === CommandTypes.MULTIPLE_CHOICE
                                ? 'Choose your answer above.'
                                : 'Proceed by asking a question, testing your knowledge, or skipping to the next topic.'
                    }
                </Text>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: '100%'
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                            handleSubmit(event);
                        }
                    }}
                >
                    <HStack
                        align={'flex-end'}
                    >
                        <FormControl
                            flex={1}
                        >
                            <Textarea
                                value={value}
                                onChange={handleChange}
                                focusBorderColor={'brand.500'}
                                flex={1}
                                isDisabled={promptType === CommandTypes.MULTIPLE_CHOICE || isLoading}
                                rows={1}
                                size={{
                                    base: 'sm',
                                    md: 'md'
                                }}
                                placeholder={promptType === CommandTypes.TEXT_BASED ? 'Type your answer...' : 'Ask a question...'}
                            />
                        </FormControl>
                        <Button
                            type={'submit'}
                            colorScheme={'brand'}
                            flexShrink={0}
                            isDisabled={promptType === CommandTypes.MULTIPLE_CHOICE || isLoading}
                            size={{
                                base: 'sm',
                                md: 'md'
                            }}
                            isLoading={isLoading}
                        >
                            {promptType === CommandTypes.TEXT_BASED ? 'Answer' : 'Ask'}
                        </Button>
                        {
                            isLoading && (
                                <Tooltip
                                    label={'Stop'}
                                >
                                    <IconButton
                                        aria-label="Stop"
                                        icon={<FaStopCircle />}
                                        onClick={stop}
                                        size={{
                                            base: 'sm',
                                            md: 'md'
                                        }}
                                    />
                                </Tooltip>
                            )
                        }
                    </HStack>
                </form>
                <HStack
                    w={'100%'}
                    spacing={4}
                >
                    <Button
                        flex={1}
                        onClick={nextQuestion}
                        colorScheme={'brand'}
                        isDisabled={promptType !== CommandTypes.REGULAR || isLoading}
                    >
                        Next Question
                    </Button>
                    <Button
                        flex={1}
                        onClick={skipTopic}
                        variant={'outline'}
                        isDisabled={promptType !== CommandTypes.REGULAR || isLoading}
                    >
                        Skip Topic
                    </Button>
                </HStack>
            </Card>
        </Flex>
    );
};

export default InputBox;
