import React from 'react';

import {HStack, Progress, Text} from "@chakra-ui/react";

import useTaskProgress from "@/hooks/queries/tasks/useTaskProgress";

import {Task} from "@/types/task/Task";


interface Props {
    taskId: Task['id']
}

const TaskProgress: React.FC<Props> = ({ taskId }) => {

    const { taskProgress, isLoading } = useTaskProgress(taskId);

    if(isLoading || !taskProgress) return (
        <Progress
            isIndeterminate
            w={'100%'}
            colorScheme={'brand'}
            rounded={'md'}
        />
    );

    return (
        <HStack
            w={'100%'}
            spacing={4}
        >
            <Text
                fontSize={'sm'}
                fontWeight={'semibold'}
            >
                {taskProgress.numCorrect} / {taskProgress.numTotal}
            </Text>
            <Progress
                value={taskProgress.numCorrect / taskProgress.numTotal * 100}
                flex={1}
                colorScheme={'brand'}
                rounded={'md'}
            />
        </HStack>
    );
};

export default TaskProgress;
