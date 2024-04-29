import {useMemo} from "react";

import useTask from "@/hooks/queries/tasks/useTask";
import useTaskTopics from "@/hooks/queries/topics/useTaskTopics";
import useTaskTopicEdges from "@/hooks/queries/topicEdges/useTaskTopicEdges";

import {Task} from "@/types/Task";


const useTaskAndTopics = (taskId: Task["id"]) => {

    const { task, isLoading: isTaskLoading } = useTask(taskId);
    const { topics, isLoading: isTopicsLoading } = useTaskTopics(taskId);
    const { topicEdges, isLoading: isTopicEdgesLoading } = useTaskTopicEdges(taskId);

    const sortedTopics = useMemo(() => {
        // if topics or topicEdges are not loaded, return an empty array
        if (isTopicsLoading || isTopicEdgesLoading) return [];
        // return a topologically sorted array of topics
        return topics.sort((a, b) => {
            const outEdges = topicEdges.filter(edge => edge.sourceTopicId === a.id);
            const inEdges = topicEdges.filter(edge => edge.sourceTopicId === b.id);
            return inEdges.length - outEdges.length;
        });
    }, [topics, topicEdges]);

    return {
        task,
        topics: sortedTopics,
        topicEdges,
        isLoading: isTaskLoading || isTopicsLoading || isTopicEdgesLoading
    }
}

export default useTaskAndTopics;