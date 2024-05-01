import {NodeProps, useReactFlow} from "reactflow";

import {NodeTypes} from "@/types/graph/NodeTypes";
import {createTopic} from "@/services/api/topic";
import {Topic} from "@/types/graph/Topic";
import {createTopicEdge} from "@/services/api/topicEdge";
import {useToast} from "@chakra-ui/react";

const useGeneratedTopic = (node: NodeProps<Topic>) => {

    const toast = useToast();

    const { setNodes, setEdges, getEdges } = useReactFlow();

    const acceptTopic = async () => {
        const newTopic = await createTopic({
            name: node.data.name,
            graph_id: node.data.graphId,
            text: ""
        });
        if(newTopic !== null) {
            const newEdge = getEdges().find((edge) => edge.target === node.id);
            if (newEdge === undefined) {
                return;
            }
            const success = await createTopicEdge({
                source_topic_id: parseInt(newEdge.source),
                target_topic_id: newTopic.id
            })
            if (success) {
                setNodes((nodes) =>
                    nodes.map((n) => node.id === n.id ? {
                        ...n,
                        id: newTopic.id.toString(),
                        data: {
                            name: newTopic.name,
                            graphId: newTopic.graph_id,
                            id: newTopic.id,
                            text: newTopic.text
                        },
                        type: NodeTypes.Topic
                    } : n)
                )
                setEdges((edges) =>
                    edges.map((edge) => edge.target === node.id
                        ? {
                            ...edge,
                            target: newTopic.id.toString(),
                            animated: false
                        }
                        : edge)
                );
                toast({
                    title: "Topic Added",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            }
        }
    }

    const rejectTopic = () => {
        setNodes((nodes) => {
            return nodes.filter((n) => n.id !== node.id);
        });
    }

    return {
        acceptTopic,
        rejectTopic
    };
}

export default useGeneratedTopic;