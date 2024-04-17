import React from 'react';
import {User} from "@/types/User";
import useCreatorGraphs from "@/hooks/queries/graphs/useCreatorGraphs";
import GraphGrid from "@/components/utilities/graphs/GraphGrid";
import {VStack} from "@chakra-ui/react";

interface Props {
    creatorId: User['id']
}

const CreatorGraphs: React.FC<Props> = ({ creatorId }) => {

    const { graphs, loading } = useCreatorGraphs(creatorId)

    return (
        <VStack
            spacing={4}
            alignItems={'flex-start'}
            w={'100%'}
        >
            <GraphGrid
                graphs={graphs}
                isLoading={loading}
            />
        </VStack>
    );
};

export default CreatorGraphs;
