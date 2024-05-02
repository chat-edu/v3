import React from 'react';

import {Box} from "@chakra-ui/react";

import {Background, ReactFlow} from "reactflow";

import {nodeTypes} from "@/components/utilities/graphMedia/GraphUpdates/nodeTypes";

import useGraphUpdateGraph from "@/hooks/graphMedia/useGraphUpdateGraph";

import {GraphUpdate} from "@/types/graph/graphUpdate/GraphUpdate";

import 'reactflow/dist/style.css';

interface Props {
    graphUpdate: GraphUpdate
}

const GraphUpdatesGraph: React.FC<Props> = ({ graphUpdate }) => {

    const {
        nodes,
        edges
    } = useGraphUpdateGraph(graphUpdate.updates);

    return (
        <Box
            w={'100%'}
            h={'250px'}
        >
           <ReactFlow
                nodes={nodes}
                edges={edges}
                edgesFocusable={false}
                nodesDraggable={false}
                nodesConnectable={false}
                fitView
                nodeTypes={nodeTypes}
                proOptions={{
                    hideAttribution: true,
                }}
           >
               <Background color="#aaa" gap={16} />
          </ReactFlow>
        </Box>
    );
};

export default GraphUpdatesGraph;
