import React from 'react';

import {GraphMedia} from "@/types/graph/GraphMedia";
import useGraphUpdate from "@/hooks/queries/graphUpdates/useGraphUpdate";
import {Heading, Skeleton, Text, VStack} from "@chakra-ui/react";
import GraphUpdatesGraph from "@/components/utilities/graphMedia/GraphUpdates/GraphUpdatesGraph";

interface Props {
    media: GraphMedia
}

const GraphUpdates: React.FC<Props> = ({ media }) => {

    const { graphUpdate, isLoading } = useGraphUpdate(media.id);

    return (
        <VStack
            spacing={2}
            w={'100%'}
            alignItems={'flex-start'}
        >
            <Heading
                size={'md'}
            >
                Graph Updates
            </Heading>
            {
                isLoading ? (
                    <Skeleton
                        w={'100%'}
                        h={'100px'}
                    />
                ) : (
                    graphUpdate ? (
                        <>
                            <Text
                                fontSize={'sm'}
                                color={'gray.500'}
                            >
                                Analysis of this {media.mediaType} yielded {graphUpdate.updates.newTopics.length} new topics, {graphUpdate.updates.newEdges.length} new connections, and {graphUpdate.updates.updatedTopics.length} topic updates.
                            </Text>
                            <GraphUpdatesGraph
                                graphUpdate={graphUpdate}
                            />
                        </>
                    ) : (
                        <Text>
                            No updates available
                        </Text>
                    )
                )
            }
        </VStack>
    );
};

export default GraphUpdates;
