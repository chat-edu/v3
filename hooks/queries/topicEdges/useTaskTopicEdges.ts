import useRows from "@/hooks/queries/base/useRows";
import adaptTopicEdge from "@/hooks/queries/topicEdges/adapter";

import {Task} from "@/types/task/Task";

const useTaskTopicEdges = (taskId: Task["id"]) => {
    const [
        topicEdges,
        isLoading,
        error,
        fetchTopicEdges
    ] = useRows(`/api/topicEdges/task/${taskId}`, adaptTopicEdge);

    return {
        topicEdges,
        isLoading,
        error,
        fetchTopicEdges
    }
}

export default useTaskTopicEdges;