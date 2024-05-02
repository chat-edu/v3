import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import GraphMedia from "@/components/utilities/graphMedia/GraphMedia";
import GraphMediaFilters from "@/components/utilities/graphMedia/GraphMediaList/GraphMediaFilters";

import {GraphMedia as GraphMediaType} from "@/types/graph/GraphMedia";


interface Props {
    graphMediaList: GraphMediaType[]
}

const GraphMediaList: React.FC<Props> = ({ graphMediaList }) => {

    const [filter, setFilter] = React.useState<string>('all');

    return (
        <VStack
            w={'100%'}
            alignItems={'flex-start'}
        >
            <GraphMediaFilters
                currentFilter={filter}
                setFilter={setFilter}
            />
            {
                graphMediaList.length === 0 ? (
                    <Text>
                        No media files.
                    </Text>
                ) : (
                    graphMediaList
                        .filter((media) => filter === 'all' || media.mediaType === filter)
                        .map((media) => (
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
