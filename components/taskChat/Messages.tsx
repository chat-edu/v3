import React from 'react';

import {Message as MessageInterface} from "ai";

import {Box, Flex, Text, VStack} from "@chakra-ui/react";

import Message from "@/components/taskChat/Message";

import {AnswerStates} from "@/hooks/task/useTaskChat";

import {Command} from "@/types/commands/Command";

interface Props {
    messages: MessageInterface[],
    isLoading: boolean,
    promptWithCommand: (command: Command<any>) => void,
    answerMapping: { [key: string]: AnswerStates }
}

const Messages: React.FC<Props> = ({ messages, promptWithCommand, answerMapping }) => {

    return (
        <Box
            w={'100%'}
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            px={2}
        >
            <Flex
                flex={1}
                w={'100%'}
                flexDirection={'column'}
                justifyContent={'flex-end'}
            >
                <VStack
                    w={'100%'}
                    spacing={4}
                    flex={messages.length === 0 ? 1 : undefined}
                    justifyContent={messages.length === 0 ? 'center' : undefined}
                    pt={2}
                >
                    {
                        messages.map((message) => (
                            <Message
                                key={message.id}
                                message={message}
                                promptWithCommand={promptWithCommand}
                                answerState={answerMapping[message.id]}
                            />
                        ))
                    }
                </VStack>
            </Flex>
        </Box>
    );
};

export default Messages;
