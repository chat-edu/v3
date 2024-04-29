import React from 'react';

import {Box, Flex, Text} from "@chakra-ui/react";

import {Background, ReactFlow} from "reactflow";

import {nodeTypes} from "@/components/task/TaskGraph/nodeTypes";

import {useTaskContext} from "@/contexts/TaskContext";

import useTaskGraph from "@/hooks/task/useTaskGraph";

import 'reactflow/dist/style.css';

const TaskGraph: React.FC = () => {

    const { taskTopics, taskEdges } = useTaskContext();

    const {
        nodes,
        edges
    } = useTaskGraph(taskTopics, taskEdges);

    return (
        <Flex
            w={'250px'}
            h={'100%'}
            borderRightWidth={2}
            flexDirection={'column'}
            gap={4}
        >
            <Text
                fontSize={'xl'}
                fontWeight={'bold'}
                mb={4}
            >
                Task Graph
            </Text>
           <ReactFlow
                nodes={nodes}
                edges={edges}
                edgesFocusable={false}
                nodesDraggable={false}
                nodesConnectable={false}
                zoomOnScroll={false}
                panOnScroll={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                fitView
                nodeTypes={nodeTypes}
           >
               <Background color="#aaa" gap={16} />
          </ReactFlow>
        </Flex>
    );
};

export default TaskGraph;
