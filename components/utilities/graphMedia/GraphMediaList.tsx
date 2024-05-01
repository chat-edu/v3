import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import GraphMedia from "@/components/utilities/graphMedia/GraphMedia";

import {GraphMedia as GraphMediaType} from "@/types/graph/GraphMedia";


interface Props {
    graphMediaList: GraphMediaType[]
}

const GraphMediaList: React.FC<Props> = ({ graphMediaList }) => {
    return (
        <VStack
            w={'100%'}
            alignItems={'flex-start'}
        >
            {
                graphMediaList.length === 0 ? (
                    <Text>
                        No media files.
                    </Text>
                ) : (
                    graphMediaList.map((media) => (
                        <GraphMedia
                            key={media.id}
                            graphMedia={media}
                        />
                    ))
                )
            }
        </VStack>
    );
};

export default GraphMediaList;
