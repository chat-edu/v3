import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {NodeProps, useReactFlow} from "reactflow";

import {createTopic} from "@/services/topic";
import {createTopicEdge} from "@/services/topicEdge";

import {Topic} from "@/types/graph/Topic";
import {NodeTypes} from "@/types/graph/NodeTypes";

const useAddedTopic = (node: NodeProps<Topic>) => {

    const toast = useToast();

    const { setNodes, getEdges } = useReactFlow();

    const [topicName, setTopicName] = useState<string>(node.data.name);

    const onSave = async ()=> {
        let createdTopic = await createTopic({
            name: topicName,
            graph_id: node.data.graphId,
            text: ''
        });

        if(createdTopic !== null) {
            setNodes((nodes) =>
                nodes.map((n) => n.id === node.id
                    ? {...n, data: {...n.data, name: topicName}, type: NodeTypes.Topic}
                    : n
                )
            );
            let incomingEdges = getEdges().filter((e) => e.target === node.id);
            await Promise.all(incomingEdges.map(async (e) =>
                createTopicEdge({
                    source_topic_id: parseInt(e.source),
                    target_topic_id: createdTopic.id
                })
            ));
            toast({
                title: "Topic Added",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const onCancel = () => {
        setNodes((nodes) => nodes.filter((n) => n.id !== node.id));
    }

    return {
        topicName,
        setTopicName,
        onSave,
        onCancel
    }
}

export default useAddedTopic;