import React from 'react';

import {Container, Heading, VStack} from "@chakra-ui/react";

import TaskInput from "@/components/subject/TaskInput";

import {Graph} from "@/types/graph/Graph";
import useGraph from "@/hooks/queries/graphs/useGraph";
import Loading from "@/components/utilities/Loading";
import UserSubjectTasks from "@/components/subject/UserSubjectTasks";
import useAuth from "@/hooks/useAuth";

interface Props {
    subjectId: Graph['id']
}

const Subject: React.FC<Props> = ({ subjectId }) => {

    const { user } = useAuth();

    const { graph, loading } = useGraph(subjectId);

    return (
        <Loading
            loading={loading || !user}
            h={'100%'}
            w={'100%'}
        >
            <Container
                py={8}
                maxW={'4xl'}
            >
                <VStack
                    spacing={4}
                    alignItems={'start'}
                    w={'100%'}
                >
                    <Heading>
                        {graph?.name}
                    </Heading>
                    <TaskInput
                        subjectId={subjectId}
                    />
                    {
                        user && (
                            <UserSubjectTasks
                                userId={user.id}
                                subjectId={subjectId}
                            />
                        )
                    }
                </VStack>
            </Container>
        </Loading>
    );
};

export default Subject;
