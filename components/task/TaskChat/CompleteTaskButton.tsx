import React from 'react';

import {Button} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";

import useCompleteTask from "@/hooks/task/useCompleteTask";

import {Task} from "@/types/task/Task";

interface Props {
    taskId: Task['id'];
}

const CompleteTaskButton: React.FC<Props> = ({ taskId }) => {

    const { onComplete, isLoading } = useCompleteTask(taskId);

    return (
        <Button
            colorScheme={'brand'}
            onClick={onComplete}
            isLoading={isLoading}
            w={'100%'}
            leftIcon={<CheckIcon />}
        >
            Complete Task
        </Button>
    );
};

export default CompleteTaskButton;
