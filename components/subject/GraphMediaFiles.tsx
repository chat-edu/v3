import React from 'react';

import {Card, Heading, HStack, Skeleton, Text, VStack} from "@chakra-ui/react";

import GraphMediaList from "@/components/utilities/graphMedia/GraphMediaList";
import AddMediaButton from "@/components/utilities/graphMedia/AddMediaButton";

import useGraphMedia from "@/hooks/queries/graphMedia/useGraphMedia";

import {Graph} from "@/types/graph/Graph";

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
                <HStack
                    w={'100%'}
                    justifyContent={'space-between'}
                >
                    <Heading
                        size={'lg'}
                    >
                        Knowledge Files
                    </Heading>
                    <AddMediaButton
                        graphId={graphId}
                    />
                </HStack>
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
                    </Card>
                )
            }

        </VStack>
    );
};

export default GraphMediaFiles;
