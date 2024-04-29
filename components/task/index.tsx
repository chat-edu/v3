import React from 'react';

import {Box, Heading, HStack, VStack} from "@chakra-ui/react";

import {Task as TaskType} from "@/types/Task";
import useTask from "@/hooks/queries/tasks/useTask";
import Loading from "@/components/utilities/Loading";
import TaskChat from "@/components/taskChat";
import useTaskAndTopics from "@/hooks/task/useTaskAndTopics";
import TaskTopics from "@/components/task/TaskTopics";

interface Props {
    taskId: TaskType['id']
}

const Task: React.FC<Props> = ({ taskId }) => {

    const { task, topics, topicEdges, isLoading } = useTaskAndTopics(taskId)

    return (
        <Loading
            loading={isLoading}
            h={'100%'}
            w={'100%'}
        >
            <VStack
                h={'100%'}
                w={'100%'}
                p={4}
            >
                <Heading>
                    {task?.text}
                </Heading>
                <HStack
                    flex={1}
                    w={'100%'}
                >
                    {
                        topics && (
                            <TaskTopics
                                topics={topics}
                            />
                        )
                    }
                    {
                        task && (
                            <TaskChat
                                task={task}
                                topics={topics}
                            />
                        )
                    }
                </HStack>
            </VStack>
        </Loading>
    );
};

export default Task;
