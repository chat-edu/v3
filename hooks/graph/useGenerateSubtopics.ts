import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {NodeProps, useReactFlow, Node, Edge} from "reactflow";

import {generateSubtopics, newTopicId} from "@/services/api/topic";

import {Topic} from "@/types/graph/Topic";
import {NodeTypes} from "@/types/graph/NodeTypes";
import {layoutGraph} from "@/services/layout";
import {useLayoutDirection} from "@/contexts/LayoutDirectionContext";
import {nodeHeight, nodeWidth} from "@/components/graph/nodes/BaseNode";

const useGenerateSubtopics = (parentNode: NodeProps<Topic>) => {

    const {
        getNodes,
        setNodes,
        getEdges,
        setEdges
    } = useReactFlow();

    const { direction } = useLayoutDirection();

    const toast = useToast();

    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const onGenerate = async () => {
        setIsGenerating(true);
        const subtopics = await generateSubtopics(parentNode.data.id);
        setIsGenerating(false);
        if(subtopics.length === 0) {
            toast({
                title: "Failed to generate subtopics",
                description: "An error occurred while generating the subtopics",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Subtopics generated",
                description: "The subtopics have been generated",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            let nodes = getNodes();
            let edges = getEdges();
            const newNodeIds = Array.from({length: subtopics.length}, () => newTopicId());
            let newNodes: Node<Topic>[] = [...nodes, ...subtopics.map((subtopic, index): Node<Topic> => ({
                id: newNodeIds[index].toString(),
                data: {
                    name: subtopic,
                    graphId: parentNode.data.graphId,
                    id: newNodeIds[index],
                    text: '',
                },
                position: {
                    x: 0,
                    y: 0,
                },
                type: NodeTypes.GeneratedTopic
            }))];
            let newEdges: Edge[] = [...edges, ...subtopics.map((_, index) => ({
                id: `e${parentNode.id}-${newNodeIds[index]}`,
                source: parentNode.id,
                target: newNodeIds[index].toString(),
                animated: true,
            }))];

            const layout = layoutGraph(newNodes, newEdges, direction, nodeHeight, nodeWidth);

            setNodes(layout.nodes);
            setEdges(layout.edges);
        }
    }

    return {
        onGenerate,
        isGenerating,
    }
}

export default useGenerateSubtopics;