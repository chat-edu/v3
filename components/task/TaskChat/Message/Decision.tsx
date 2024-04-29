import React, { useState } from 'react';

import {Button, HStack, VStack, Text} from "@chakra-ui/react";

import Markdown from "@/components/utilities/markdown";
import {useTaskContext} from "@/contexts/TaskContext";


interface Props {
    skipTopic: () => void,
    nextQuestion: () => void,
}

const Decision: React.FC<Props> = ({ skipTopic, nextQuestion }) => {

    const { taskTopics, correctAnswersByTopic, currentTopicIndex } = useTaskContext();

    return (
        <HStack
            w={'100%'}
            spacing={4}
        >
            <VStack
                w={'100%'}
                alignItems={'flex-start'}
                flex={1}
            >
                <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                >
                    Current Topic: {taskTopics[currentTopicIndex].name}
                </Text>
                <Text>
                    Proceed by asking a question, testing your knowledge, or skipping to the next topic.
                </Text>
                <HStack
                    w={'100%'}
                    spacing={4}
                >
                    <Button
                        flex={1}
                        onClick={nextQuestion}
                        colorScheme={'brand'}
                    >
                        Next Question
                    </Button>
                    <Button
                        flex={1}
                        onClick={skipTopic}
                        variant={'outline'}
                    >
                        Skip Topic
                    </Button>
                </HStack>
            </VStack>
        </HStack>
    );
};

export default Decision;
