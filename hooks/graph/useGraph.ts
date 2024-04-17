import {useEffect} from "react";

import {useEdgesState, useNodesState, Node} from "reactflow";

import useGraphTopics from "@/hooks/queries/topics/useGraphTopics";
import useGraphQuery from "@/hooks/queries/graphs/useGraph";
import useGraphTopicEdges from "@/hooks/queries/topicEdges/useGraphTopicEdges";

import {layoutGraph} from "@/services/layout";
import {deleteTopic} from "@/services/topic";

import {useLayoutDirection} from "@/contexts/LayoutDirectionContext";

import {Graph} from "@/types/graph/Graph";
import {Topic} from "@/types/graph/Topic";
import {NodeTypes} from "@/types/graph/NodeTypes";
import {useToast} from "@chakra-ui/react";

const useGraph = (graphId: Graph["id"]) => {

    const toast = useToast();

    const { direction } = useLayoutDirection();

    const { graph, loading: graphLoading } = useGraphQuery(graphId);

    const { topics, loading: topicsLoading } = useGraphTopics(graphId);
    const { topicEdges, loading: topicEdgesLoading } = useGraphTopicEdges(graphId);

    const [nodes, setNodes, onNodesChange] = useNodesState<Topic>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if(!topicsLoading && !topicEdgesLoading) {
            const layout = layoutGraph(
                topics.map((topic): Node<Topic> => ({
                    id: topic.id.toString(),
                    data: topic,
                    type: NodeTypes.Topic,
                    position: { x: 0, y: 0 }
                })),
                topicEdges.map(edge => ({
                    id: `e${edge.sourceTopicId}-${edge.targetTopicId}`,
                    source: edge.sourceTopicId.toString(),
                    target: edge.targetTopicId.toString()
                })),
                direction
            );
            setNodes(layout.nodes);
            setEdges(layout.edges);
        }
    }, [topics, topicEdges]);

    useEffect(() => {
        const newEdges = topicEdges.map(edge => ({
            id: `e${edge.sourceTopicId}-${edge.targetTopicId}`,
            source: edge.sourceTopicId.toString(),
            target: edge.targetTopicId.toString()
        }));
        if(nodes.length === 0) {
            setEdges(newEdges);
            return;
        }
        const layout = layoutGraph(nodes, newEdges, direction);
        setNodes(layout.nodes);
        setEdges(layout.edges);
    }, [topicEdges]);

    const onNodesDelete = async (nodes: Node<Topic>[]) => {
        for(const node of nodes) {
            const success = await deleteTopic(node.data.id, graphId);
            if(success) {
                setNodes((nodes) => nodes.filter(n => n.id !== node.id));
                setEdges((edges) => edges.filter(edge => edge.source !== node.id && edge.target !== node.id));
                toast({
                    title: "Topic Deleted",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }

    return {
        graph,
        graphLoading,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        onNodesDelete
    }
}

export default useGraph;