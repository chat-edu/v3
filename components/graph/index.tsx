import React from 'react';

import {Heading, Text, VStack} from "@chakra-ui/react";

import {Background, Controls, NodeTypes, Panel, ReactFlow} from "reactflow";

import LayoutToggle from "@/components/graph/LayoutToggle";
import TopicNode from "@/components/graph/nodes/TopicNode";
import GeneratedTopicNode from "@/components/graph/nodes/GeneratedTopicNode";
import AddedTopicNode from "@/components/graph/nodes/AddedTopicNode";

import useGraph from "@/hooks/graph/useGraph";

import {LayoutDirectionProvider} from "@/contexts/LayoutDirectionContext";

import {NodeTypes as NodeTypesEnum} from "@/types/graph/NodeTypes";
import {Graph as GraphType} from "@/types/graph/Graph";

import 'reactflow/dist/style.css';
import Loading from "@/components/utilities/Loading";
import UsernameText from "@/components/utilities/UsernameText";

const nodeTypes: NodeTypes = {
    [NodeTypesEnum.Topic]: TopicNode,
    [NodeTypesEnum.GeneratedTopic]: GeneratedTopicNode,
    [NodeTypesEnum.AddedTopic]: AddedTopicNode
};

interface Props {
    graphId: GraphType['id']
}

const Graph: React.FC<Props> = ({ graphId }) => {

    const {
        graph,
        graphLoading,
        nodes,
        onNodesChange,
        edges,
        onEdgesChange,
        onNodesDelete
    } = useGraph(graphId);

    return (
        <LayoutDirectionProvider>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                onNodesDelete={onNodesDelete}
                edges={edges}
                onEdgesChange={onEdgesChange}
                fitView
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background color="#aaa" gap={16} />
                <Panel
                    position={"top-left"}
                >
                    <Loading loading={graphLoading}>
                        {
                            graph ? (
                                <VStack
                                    alignItems={'flex-start'}
                                >
                                    <Heading>
                                        {graph?.name}
                                    </Heading>
                                    <UsernameText id={graph?.creatorId} />
                                </VStack>
                            ) : (
                                <Text>
                                    Graph not found
                                </Text>
                            )
                        }
                    </Loading>
                </Panel>
                <Panel
                    position={"top-right"}
                >
                    <LayoutToggle />
                </Panel>
            </ReactFlow>
        </LayoutDirectionProvider>
    );
};

export default Graph;
