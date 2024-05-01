import React from 'react';
import {Graph} from "@/types/graph/Graph";
import {Card, Heading, Skeleton, Text, VStack} from "@chakra-ui/react";
import useUnprocessedGraphMedia from "@/hooks/queries/graphMedia/useUnprocessedGraphMedia";
import GraphMedia from "@/components/utilities/graphMedia/GraphMedia";
import useProcessedGraphMedia from "@/hooks/queries/graphMedia/useProcessedGraphMedia";

interface Props {
    graphId: Graph['id'];
}

const ProcessedMedia: React.FC<Props> = ({ graphId }) => {

    const { graphMedia, loading } = useProcessedGraphMedia(graphId)

    return (
        <Card
            gap={4}
        >
            <VStack
                spacing={2}
                w={'100%'}
                alignItems={'flex-start'}
            >
                <Heading
                    size={'md'}
                >
                    Active Knowledge Files
                </Heading>
                <Text
                    color={'gray.500'}
                    fontSize={'sm'}
                >
                    Media files that are incorporated into your knowledge graph.
                </Text>
            </VStack>
            {
                loading ? (
                    <Skeleton
                        w={'100%'}
                        h={'100%'}
                    />
                ) : (
                    <VStack
                        w={'100%'}
                        alignItems={'flex-start'}
                    >
                        {
                            graphMedia.length === 0 ? (
                                <Text>
                                    No unprocessed media. Add some!
                                </Text>
                            ) : (
                                graphMedia.map((media) => (
                                    <GraphMedia
                                        key={media.id}
                                        graphMedia={media}
                                    />
                                ))
                            )
                        }
                    </VStack>
                )
            }
        </Card>
    );
};

export default ProcessedMedia;
