import React from 'react';

import Link from "next/link";

import {Button, Container, Heading, HStack, VStack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import TaskInput from "@/components/subject/TaskInput";
import UserSubjectTasks from "@/components/subject/UserSubjectTasks";
import Loading from "@/components/utilities/Loading";

import useGraph from "@/hooks/queries/graphs/useGraph";
import useAuth from "@/hooks/useAuth";

import {Graph} from "@/types/graph/Graph";

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
                        </Heading>s
                        <HStack>
                            <Link
                                href={`/subject/${subjectId}/addContent`}
                            >
                                <Button
                                    leftIcon={<AddIcon />}
                                    colorScheme={'brand'}
                                >
                                    Add Content
                                </Button>
                            </Link>
                            <Link href={`/graph/${subjectId}`}>
                                <Button
                                    colorScheme={'brand'}
                                    variant={'outline'}
                                >
                                    View Graph
                                </Button>
                            </Link>
                        </HStack>
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
