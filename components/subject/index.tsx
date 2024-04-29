import React from 'react';

import {Button, Container, Heading, HStack, VStack} from "@chakra-ui/react";

import TaskInput from "@/components/subject/TaskInput";

import {Graph} from "@/types/graph/Graph";
import useGraph from "@/hooks/queries/graphs/useGraph";
import Loading from "@/components/utilities/Loading";
import UserSubjectTasks from "@/components/subject/UserSubjectTasks";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

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
                    <HStack
                        w={'100%'}
                        justifyContent={'space-between'}
                    >
                        <Heading>
                            {graph?.name}
                        </Heading>
                        <Link href={`/graph/${subjectId}`}>
                            <Button
                                colorScheme={'brand'}
                                variant={'outline'}
                            >
                                View Graph
                            </Button>
                        </Link>
                    </HStack>
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
