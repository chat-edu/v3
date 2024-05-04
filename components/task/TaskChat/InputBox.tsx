import React, {ChangeEventHandler} from 'react';

import {
    Button,
    Card,
    Flex,
    FormControl,
    HStack,
    IconButton, Input,
    Text,
    Textarea,
    Tooltip,
    useColorModeValue
} from "@chakra-ui/react";

import {FaStopCircle} from "react-icons/fa";

import {AnswerStates} from "@/hooks/task/useTaskChat";

import {Command, CommandTypes} from "@/types/commands/Command";
import {useTaskContext} from "@/contexts/TaskContext";
import SpeechToText from "@/components/utilities/SpeechToText";
import {FaImage} from "react-icons/fa6";
import AddedImage from "@/components/task/TaskChat/AddedImage";
import CompleteTaskButton from "@/components/task/TaskChat/CompleteTaskButton";

interface Props {
    value: string,
    isLoading: boolean,
    stop: () => void,
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    setInput: (input: string) => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    promptWithCommand: (command: Command<any>) => void,
    promptType: CommandTypes
    showMessage: boolean;
    answerMapping: { [key: string]: AnswerStates };
    nextQuestion: () => void;
    skipTopic: () => void;
    handleImagesChange: ChangeEventHandler<HTMLInputElement>;
    images: string[];
    removeImage: (index: number) => void;
}

const InputBox: React.FC<Props> = ({ value, isLoading, stop, handleChange, setInput, handleSubmit, nextQuestion, skipTopic, promptType, handleImagesChange, images, removeImage  }) => {

    const { task, taskTopics, currentTopicIndex, correctAnswersByTopic } = useTaskContext();

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
                <HStack>
                    {
                        images.map((image, index) => (
                            <AddedImage
                                key={index}
                                image={image}
                                removeImage={() => removeImage(index)}
                            />
                        ))
                    }
                </HStack>
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
                        <Input
                            type={'file'}
                            display={'none'}
                            id={'file'}
                            accept={'image/*'}
                            onChange={handleImagesChange}
                            multiple
                        />
                        <IconButton
                            as={'label'}
                            variant={'outline'}
                            htmlFor={'file'}
                            colorScheme={'brand'}
                            flexShrink={0}
                            icon={<FaImage />}
                            aria-label={'Upload Image'}
                        />
                        <SpeechToText
                            setText={setInput}
                        />
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
                {
                    currentTopicIndex === taskTopics.length - 1 && correctAnswersByTopic[currentTopicIndex] === 3 ? (
                        <CompleteTaskButton
                            taskId={task.id}
                        />
                    ) : (
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
                    )
                }
            </Card>
        </Flex>
    );
};

export default InputBox;
