import React from 'react';

import {Box} from "@chakra-ui/react";

import {ReactFlow} from "reactflow";

import nodeTypes from "@/components/home/NotLoggedIn/LandingGraph/nodes/nodeTypes";
import {landingNodeWidth} from "@/components/home/NotLoggedIn/LandingGraph/nodes/LandingNode";
import {layoutTopLevel, layoutSecondBrain} from "@/components/home/NotLoggedIn/LandingGraph/layout";
import {
    secondBrainNodeHeight,
    secondBrainNodeWidth
} from "@/components/home/NotLoggedIn/LandingGraph/nodes/SecondBrainNode";

import 'reactflow/dist/style.css';

const secondBrainLayout = layoutSecondBrain();
const topLevelLayout = layoutTopLevel();

const graphWidth = secondBrainNodeWidth + landingNodeWidth + 50;
const graphHeight = secondBrainNodeHeight;

const Graph = () => {

    return (
        <Box
            w={'100%'}
            aspectRatio={`${graphWidth}/${graphHeight}`}
        >
            <ReactFlow
                nodes={[...topLevelLayout.nodes, ...secondBrainLayout.nodes]}
                edges={[...topLevelLayout.edges, ...secondBrainLayout.edges]}
                fitView
                nodeTypes={nodeTypes}
                zoomOnPinch={false}
                zoomOnScroll={false}
                zoomOnDoubleClick={false}
                panOnScroll={false}
                panOnDrag={false}
                proOptions={{
                    hideAttribution: true,
                }}
            />
        </Box>
    );
};

export default Graph;
