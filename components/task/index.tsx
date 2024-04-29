import React from 'react';

import {Container, Flex, HStack, VStack} from "@chakra-ui/react";

import Loading from "@/components/utilities/Loading";
import TaskChat from "@/components/task/TaskChat";
import TaskGraph from "@/components/task/TaskGraph";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import useTaskAndTopics from "@/hooks/task/useTaskAndTopics";

import {mobileNavbarHeight, navbarHeight} from "@/components/layout/navbar";

import {Task as TaskType} from "@/types/Task";
import {TaskContextProvider} from "@/contexts/TaskContext";

interface Props {
    taskId: TaskType['id']
}

const Task: React.FC<Props> = ({ taskId }) => {

    const { height } = useViewportDimensions();

    const { task, topics, topicEdges, isLoading } = useTaskAndTopics(taskId)

    return (
        <Loading
            loading={isLoading}
            h={'100%'}
            w={'100%'}
            bg={'green'}
        >
            {
                isLoading || !task ? null : (
                    <TaskContextProvider
                        task={task} taskTopics={topics} taskEdges={topicEdges}
                    >
                        <VStack
                            w={'100%'}
                            p={4}
                            h={{
                                base: height - mobileNavbarHeight,
                                md: height - navbarHeight
                            }}
                        >
                            <HStack
                                flex={1}
                                w={'100%'}
                                h={'100%'}
                                maxH={'100%'}
                            >
                                <TaskGraph />
                                <Container
                                    flex={1}
                                    maxW={'6xl'}
                                    p={0}
                                    h={'100%'}
                                >
                                    <Flex
                                        flexDirection={'column'}
                                        w={'100%'}
                                        position={'relative'}
                                        overflow={'auto'}
                                        maxH={'100%'}
                                        h={'100%'}
                                    >
                                        <TaskChat />
                                    </Flex>
                                </Container>
                            </HStack>
                        </VStack>
                    </TaskContextProvider>
                )
            }
        </Loading>
    );
};

export default Task;
