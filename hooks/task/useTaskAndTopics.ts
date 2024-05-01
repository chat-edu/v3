import {useMemo} from "react";

import useTask from "@/hooks/queries/tasks/useTask";
import useTaskTopics from "@/hooks/queries/topics/useTaskTopics";
import useTaskTopicEdges from "@/hooks/queries/topicEdges/useTaskTopicEdges";

import {Task} from "@/types/Task";
import {Topic} from "@/types/graph/Topic";


const useTaskAndTopics = (taskId: Task["id"]) => {

    const { task, isLoading: isTaskLoading } = useTask(taskId);
    const { topics, isLoading: isTopicsLoading } = useTaskTopics(taskId);
    const { topicEdges, isLoading: isTopicEdgesLoading } = useTaskTopicEdges(taskId);

    const sortedTopics = useMemo(() => {
        // if topics or topicEdges are not loaded, return an empty array
        if (isTopicsLoading || isTopicEdgesLoading) return [];
        // perform a topological sort on the topics
        const sortedTopics: Topic[] = [];
        const visited = new Set();
        const visit = (topicId: number) => {
            if (visited.has(topicId)) return;
            visited.add(topicId);
            const topic = topics.find(topic => topic.id === topicId);
            if (!topic) return;
            topicEdges
                .filter(edge => edge.targetTopicId === topicId)
                .forEach(edge => visit(edge.sourceTopicId));
            sortedTopics.push(topic);
        }
        topics.forEach(topic => visit(topic.id));
        return sortedTopics;
    }, [topics, topicEdges]);

    return {
        task,
        topics: sortedTopics,
        topicEdges,
        isLoading: isTaskLoading || isTopicsLoading || isTopicEdgesLoading
    }
}

export default useTaskAndTopics;