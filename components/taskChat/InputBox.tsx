import React, {ChangeEventHandler} from 'react';

import {
    Box,
    Button,
    Card,
    CircularProgress,
    Flex,
    FormControl,
    FormLabel,
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
}

const InputBox: React.FC<Props> = ({ value, isLoading, stop, handleChange, handleSubmit, promptWithCommand, promptType, showMessage, answerMapping }) => {

    const inputBoxColor = useColorModeValue("white", "#2D2D2D");

    const numCorrect = Object.values(answerMapping).filter(state => state === AnswerStates.CORRECT).length;
    const numAnswered = Object.values(answerMapping).filter(state => state !== AnswerStates.DONT_KNOW).length;

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
            >
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
                        {
                            numAnswered > 0 && (
                                <Box
                                    position={'relative'}
                                    boxSize={'60px'}
                                >
                                    <CircularProgress
                                        color={'brand.500'}
                                        value={numCorrect}
                                        max={numAnswered}
                                        size={'60px'}
                                    />
                                    <Text
                                        position={'absolute'}
                                        top={'50%'}
                                        left={'50%'}
                                        transform={'translate(-50%, -50%)'}
                                        fontSize={'xs'}
                                        fontWeight={'bold'}
                                    >
                                        {Math.ceil(numCorrect / numAnswered * 100)}%
                                    </Text>
                                </Box>
                            )
                        }
                        <FormControl
                            flex={1}
                        >
                            <FormLabel>
                                {promptType === CommandTypes.TEXT_BASED ? 'Answer' : 'Ask ChatEDU'}
                            </FormLabel>
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
            </Card>
        </Flex>
    );
};

export default InputBox;
