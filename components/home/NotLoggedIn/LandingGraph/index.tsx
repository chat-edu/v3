import React from 'react';

import {Box} from "@chakra-ui/react";

import {ReactFlow} from "reactflow";

import nodeTypes from "@/components/home/NotLoggedIn/LandingGraph/nodes/nodeTypes";
import {layoutTopLevel, layoutUser} from "@/components/home/NotLoggedIn/LandingGraph/layout";
import {secondBrainNodes, secondBrainEdges} from "@/components/home/NotLoggedIn/LandingGraph/data";

import 'reactflow/dist/style.css';
import {
    graphHeight,
    graphWidth,
} from "@/components/home/NotLoggedIn/LandingGraph/nodes/consts";

const topLevelLayout = layoutTopLevel();
const userLayout = layoutUser();

const Graph = () => {

    return (
        <Box
            w={'100%'}
            aspectRatio={`${graphWidth}/${graphHeight}`}
        >
            <ReactFlow
                nodes={[...topLevelLayout.nodes, ...secondBrainNodes, ...userLayout.nodes]}
                edges={[...topLevelLayout.edges, ...secondBrainEdges, ...userLayout.edges]}
                fitView
                nodeTypes={nodeTypes}
                // zoomOnPinch={false}
                // zoomOnScroll={false}
                // zoomOnDoubleClick={false}
                // panOnScroll={false}
                // panOnDrag={false}
                proOptions={{
                    hideAttribution: true,
                }}
            />
        </Box>
    );
};

export default Graph;
