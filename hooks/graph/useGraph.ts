import {useEffect} from "react";

import {useToast} from "@chakra-ui/react";

import {useEdgesState, useNodesState, Node, Edge, Connection, addEdge} from "reactflow";

import useGraphTopics from "@/hooks/queries/topics/useGraphTopics";
import useGraphQuery from "@/hooks/queries/graphs/useGraph";
import useGraphTopicEdges from "@/hooks/queries/topicEdges/useGraphTopicEdges";

import {layoutGraph} from "@/services/layout";
import {deleteTopic} from "@/services/api/topic";
import {createTopicEdge, deleteTopicEdge} from "@/services/api/topicEdge";

import {useLayoutDirection} from "@/contexts/LayoutDirectionContext";

import {Graph} from "@/types/graph/Graph";
import {Topic} from "@/types/graph/Topic";
import {NodeTypes} from "@/types/graph/NodeTypes";
import {nodeHeight, nodeWidth} from "@/components/graph/nodes/BaseNode";


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
                direction,
                nodeHeight,
                nodeWidth
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
        const layout = layoutGraph(nodes, newEdges, direction, nodeHeight, nodeWidth);
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

    const onConnect = async (edge: Edge | Connection) => {
        if(!edge.source || !edge.target) return;
        const topicEdgeRow = await createTopicEdge({
            source_topic_id: parseInt(edge.source),
            target_topic_id: parseInt(edge.target)
        });
        if(topicEdgeRow) {
            setEdges((eds) => addEdge({
                ...edge,
            }, eds));
            toast({
                title: "Edge Created",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const onEdgesDelete = async (edges: Edge[]) => {
        for(const edge of edges) {
            const [sourceId, targetId] = [parseInt(edge.source), parseInt(edge.target)];
            const success = await deleteTopicEdge({
                source_topic_id: sourceId,
                target_topic_id: targetId
            });
            if(success) {
                setEdges((edges) => edges.filter(e => e.id !== edge.id));
                toast({
                    title: "Edge Deleted",
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
        onNodesDelete,
        edges,
        setEdges,
        onEdgesChange,
        onEdgesDelete,
        onConnect,
    }
}

export default useGraph;