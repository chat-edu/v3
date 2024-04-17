import React from 'react';
import {Graph} from "@/types/graph/Graph";
import Loading from "@/components/utilities/Loading";
import {SimpleGrid} from "@chakra-ui/react";
import GraphCard from "@/components/utilities/graphs/GraphCard";

interface Props {
    graphs: Graph[];
    isLoading: boolean;
}

const GraphGrid: React.FC<Props> = ({ graphs, isLoading }) => {
    return (
        <Loading
            loading={isLoading}
        >
            <SimpleGrid
                columns={{
                    base: 1,
                    md: 2
                }}
                w={'100%'}
                gap={2}
            >
                {
                    graphs.map(graph => (
                        <GraphCard
                            graph={graph}
                            key={graph.id}
                        />
                    ))
                }
            </SimpleGrid>
        </Loading>
    );
};

export default GraphGrid;
