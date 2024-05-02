import {useEffect} from "react";

import {Node, useEdgesState, useNodesState} from "reactflow";

import {layoutGraph} from "@/services/layout";

import {nodeHeight, nodeWidth} from "@/components/task/TaskGraph/TaskNode";

import {LayoutDirections} from "@/types/graph/GraphLayout";
import {NewTopic} from "@/llm/types/graphUpdates/NewTopic";
import {UpdatedTopic} from "@/llm/types/graphUpdates/UpdatedTopic";
import {GraphUpdate} from "@/types/graph/graphUpdate/GraphUpdate";
import {GraphUpdateNodeTypes} from "@/types/graph/graphUpdate/GraphUpdateNodeTypes";

const useGraphUpdateGraph = (updates: GraphUpdate["updates"]) => {
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    const handleUpdates = async (updates: GraphUpdate["updates"]) => {
        // get all existing topics that are a source or target of an edge
        const existingTopicNames = updates.newEdges.reduce((acc, edge) => {
            if(!acc.includes(edge.sourceTopicName)
                && !updates.newTopics.find(topic => topic.name === edge.sourceTopicName)
                && !updates.updatedTopics.find(topic => topic.name === edge.sourceTopicName))
            {
                acc.push(edge.sourceTopicName);
            }
            if(!acc.includes(edge.targetTopicName)
                && !updates.newTopics.find(topic => topic.name === edge.targetTopicName)
                && !updates.updatedTopics.find(topic => topic.name === edge.targetTopicName))
            {
                acc.push(edge.targetTopicName);
            }
            return acc;
        }, [] as string[]);

        const layout = layoutGraph(
            [
                ...updates.newTopics.map((topic): Node<NewTopic> => ({
                    id: topic.name,
                    data: topic,
                    type: GraphUpdateNodeTypes.New,
                    position: { x: 0, y: 0 }
                })),
                ...updates.updatedTopics.map((topic): Node<UpdatedTopic> => ({
                    id: topic.name,
                    data: topic,
                    type: GraphUpdateNodeTypes.Updated,
                    position: { x: 0, y: 0 }
                })),
                ...existingTopicNames.map((topicName): Node<string> => ({
                    id: topicName,
                    data: topicName,
                    type: GraphUpdateNodeTypes.Existing,
                    position: { x: 0, y: 0 }
                }))
            ],
            updates.newEdges.map(edge => ({
                id: `e${edge.sourceTopicName}-${edge.sourceTopicName}`,
                source: edge.sourceTopicName,
                target: edge.targetTopicName,
                animated: true
            })),
            LayoutDirections.Horizontal,
            nodeHeight,
            nodeWidth
        );
        setNodes(layout.nodes);
        setEdges(layout.edges);
    }

    useEffect(() => {
        if(!updates) return;
        handleUpdates(updates);
    }, [updates]);

    return {
        nodes,
        edges,
    }
}

export default useGraphUpdateGraph