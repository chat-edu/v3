import React from 'react';

import {Card, Container, VStack} from "@chakra-ui/react";

import TaskInput from "@/components/subject/TaskInput";
import UserSubjectTasks from "@/components/subject/UserSubjectTasks";
import Loading from "@/components/utilities/Loading";
import GraphMediaFiles from "@/components/subject/GraphMediaFiles";
import SubjectHeader from "@/components/subject/SubjectHeader";

import useGraph from "@/hooks/queries/graphs/useGraph";
import useAuth from "@/hooks/useAuth";

import {Graph} from "@/types/graph/Graph";
import DeleteSubject from "@/components/subject/DeleteSubject";

interface Props {
    subjectId: Graph['id']
}

const Subject: React.FC<Props> = ({ subjectId }) => {

    const { user } = useAuth();

    const { graph, loading } = useGraph(subjectId);

    return (
        <Loading
            loading={loading || !user || !graph}
            h={'100%'}
            w={'100%'}
        >
            <Container
                py={8}
                maxW={'4xl'}
            >

                    {
                        graph ? (
                            <VStack
                                spacing={8}
                                alignItems={'start'}
                                w={'100%'}
                            >
                                <SubjectHeader
                                    graph={graph}
                                />
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
                                <GraphMediaFiles
                                    graphId={subjectId}
                                />
                                <DeleteSubject
                                    graphId={subjectId}
                                />
                            </VStack>
                        ) : (
                            <Card>
                                Subject not found.
                            </Card>
                        )
                    }
            </Container>
        </Loading>
    );
};

export default Subject;
