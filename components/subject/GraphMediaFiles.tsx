import React from 'react';

import {Button, Card, Heading, Skeleton, Text, VStack} from "@chakra-ui/react";

import useGraphMedia from "@/hooks/queries/graphMedia/useGraphMedia";

import {Graph} from "@/types/graph/Graph";
import GraphMediaList from "@/components/utilities/graphMedia/GraphMediaList";
import {AddIcon} from "@chakra-ui/icons";
import Link from "next/link";


interface Props {
    graphId: Graph['id'];
}

const GraphMediaFiles: React.FC<Props> = ({ graphId }) => {

    const { graphMedia, loading } = useGraphMedia(graphId);

    return (
        <VStack
            w={'100%'}
            alignItems={'start'}
            spacing={4}
        >
            <VStack
                w={'100%'}
                alignItems={'start'}
            >
                <Heading
                    size={'lg'}
                >
                    Knowledge Files
                </Heading>
                <Text
                    fontSize={'sm'}
                    color={'gray.500'}
                >
                    Files that you have uploaded to construct your knowledge graph
                </Text>
            </VStack>
            {
                loading ? (
                    <Skeleton
                        w={'100%'}
                        h={'100px'}
                    />
                ) : (
                    <Card
                        w={'100%'}
                        gap={2}
                    >
                        <GraphMediaList
                            graphMediaList={graphMedia}
                        />
                        <Link
                            href={`/subject/${graphId}/addContent`}
                            style={{ width: '100%' }}
                        >
                            <Button
                                leftIcon={<AddIcon />}
                                colorScheme={'brand'}
                                w={'100%'}
                            >
                                Add Content
                            </Button>
                        </Link>
                    </Card>
                )
            }

        </VStack>
    );
};

export default GraphMediaFiles;
