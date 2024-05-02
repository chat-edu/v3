import React from 'react';
import useUserSubjectTasks from "@/hooks/queries/tasks/useUserSubjectTasks";
import {User} from "@/types/User";
import {Graph} from "@/types/graph/Graph";
import {Card, Heading, Text, VStack} from "@chakra-ui/react";
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
            <VStack
                w={'100%'}
                alignItems={'start'}
            >
                <Heading
                    size={'lg'}
                >
                    Tasks
                </Heading>
                <Text
                    fontSize={'sm'}
                    color={'gray.500'}
                >
                    Step-by-step walkthroughes of your learning objectives..
                </Text>
            </VStack>
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
                            />
                        ))
                    )
                }
            </Loading>
        </VStack>
    );
};

export default UserSubjectTasks;
