import React from 'react';

import {Skeleton, Text} from "@chakra-ui/react";

import useGraph from "@/hooks/queries/graphs/useGraph";

import {Task} from "@/types/task/Task";

interface Props {
    task: Task
}

const TaskSubject: React.FC<Props> = ({ task }) => {

    const { graph, loading } = useGraph(task.graphId);

    if(loading || !graph) {
        return (
            <Skeleton
                h={'24px'}
                w={'100%'}
            />
        )
    }

    return (
        <Text
            fontWeight={'semibold'}
            opacity={0.5}
            fontSize={'sm'}
        >
            {graph?.name}
        </Text>
    );
};

export default TaskSubject;
