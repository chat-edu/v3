import {useEffect} from "react";

import {Node, useEdgesState, useNodesState} from "reactflow";

import {nodeHeight, nodeWidth} from "@/components/task/TaskGraph/TaskNode";

import {layoutGraph} from "@/services/layout";

import {Topic} from "@/types/graph/Topic";
import {TopicEdge} from "@/types/graph/TopicEdge";
import {LayoutDirections} from "@/types/graph/GraphLayout";
import {TaskNodeTypes} from "@/types/task/TaskNodeTypes";

const useTaskGraph = (topics: Topic[], topicEdges: TopicEdge[]) => {

    const [nodes, setNodes] = useNodesState<Topic>([]);
    const [edges, setEdges] = useEdgesState([]);

    useEffect(() => {
        if(!topics || !topicEdges) return;
        const layout = layoutGraph(
            topics.map((topic): Node<Topic> => ({
                id: topic.id.toString(),
                data: topic,
                type: TaskNodeTypes.TaskNode,
                position: { x: 0, y: 0 }
            })),
            topicEdges.map(edge => ({
                id: `e${edge.sourceTopicId}-${edge.targetTopicId}`,
                source: edge.sourceTopicId.toString(),
                target: edge.targetTopicId.toString(),
                animated: true
            })),
            LayoutDirections.Vertical,
            nodeHeight,
            nodeWidth
        );
        setNodes(layout.nodes);
        setEdges(layout.edges);
    }, [topics, topicEdges]);

    return {
        nodes,
        edges,
    }
}

export default useTaskGraph;