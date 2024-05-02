import React from 'react';
import {useTaskContext} from "@/contexts/TaskContext";
import useTaskSummary from "@/hooks/queries/taskSummaries/useTaskSummary";
import {Card, Container, Heading, Skeleton, Text, VStack} from "@chakra-ui/react";
import Markdown from "@/components/utilities/markdown";

const CompletedTask = () => {

    const { task } = useTaskContext();

    const { taskSummary, isLoading } = useTaskSummary(task.id);

    return (
        <Container
            py={8}
            maxW={'4xl'}
            w={'100%'}
            h={'100%'}
            overflow={'auto'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={8}
        >
            <VStack
                w={'100%'}
                alignItems={'flex-start'}
            >
                <Heading
                    size={'lg'}
                >
                    Completed Task
                </Heading>
                <VStack
                    spacing={0}
                    w={'100%'}
                    alignItems={'flex-start'}
                >
                    <Text
                        fontSize={'sm'}
                        opacity={0.8}
                    >
                        Task
                    </Text>
                    <Text
                        fontSize={'md'}
                        fontWeight={'semibold'}
                    >
                        {task.text}
                    </Text>
                </VStack>
            </VStack>
            {
                isLoading || !taskSummary ? (
                    <Skeleton />
                ) : (
                    <Card>
                        <Markdown>
                            {taskSummary.summary}
                        </Markdown>
                    </Card>
                )
            }
        </Container>
    );
};

export default CompletedTask;
