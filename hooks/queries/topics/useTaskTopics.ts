import useRows from "@/hooks/queries/base/useRows";
import adaptTopic from "@/hooks/queries/topics/adapter";

import {Task} from "@/types/task/Task";

const useTaskTopics = (taskId: Task["id"]) => {
    const [
        topics,
        isLoading,
        error,
        fetchTopics
    ] = useRows(`/api/topics/task/${taskId}`, adaptTopic);

    return {
        topics,
        isLoading,
        error,
        fetchTopics
    }
}

export default useTaskTopics;