import React from 'react';
import useUserSubjectTasks from "@/hooks/queries/tasks/useUserSubjectTasks";
import {User} from "@/types/User";
import {Graph} from "@/types/graph/Graph";
import {Text, VStack} from "@chakra-ui/react";
import Loading from "@/components/utilities/Loading";
import TaskCard from "@/components/task/TaskCard";

interface Props {
    userId: User['id'],
    subjectId: Graph['id']
}

const UserSubjectTasks: React.FC<Props> = ({ userId, subjectId }) => {

    const { tasks, isLoading } = useUserSubjectTasks(userId, subjectId);

    return (
        <VStack
            w={'full'}
            spacing={4}
            alignItems={'start'}
        >
            <Text
                fontWeight={'bold'}
                fontSize={'xl'}
            >
                Your Tasks
            </Text>
            <Loading
                loading={isLoading}
                w={'full'}
            >
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                    />
                ))}
            </Loading>
        </VStack>
    );
};

export default UserSubjectTasks;
