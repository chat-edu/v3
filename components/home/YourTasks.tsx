import React from 'react';

import {Card, Heading, VStack} from "@chakra-ui/react";

import Loading from "@/components/utilities/Loading";
import TaskCard from "@/components/task/TaskCard";

import useUserTasks from "@/hooks/queries/tasks/useUserTasks";
import useAuth from "@/hooks/useAuth";
import CreateTask from "@/components/home/CreateTask";


const YourTasks = () => {

    const { user } = useAuth();

    const { tasks, isLoading } = useUserTasks(user?.id || '');

    return (
        <VStack
            w={'full'}
            spacing={4}
            alignItems={'start'}
        >
            <Heading>
                Your Tasks
            </Heading>
            <CreateTask />
            <Loading
                loading={isLoading}
                w={'full'}
            >
                {
                    tasks.length === 0 ? (
                        <Card
                            w={'full'}
                        >
                            No tasks yet.
                        </Card>
                    ) : (
                        tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                showSubject
                            />
                        ))
                    )
                }
            </Loading>
        </VStack>
    );
};

export default YourTasks;
