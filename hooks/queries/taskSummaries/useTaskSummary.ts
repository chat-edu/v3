import useRow from "@/hooks/queries/base/useRow";
import adaptTaskSummary from "@/hooks/queries/taskSummaries/adapter";

import {Task} from "@/types/task/Task";

const useTaskSummary = (taskId: Task["id"]) => {
    const [
        taskSummary,
        isLoading,
        error,
        fetchTaskSummary
    ] = useRow(`/api/tasks/${taskId}/summary`, adaptTaskSummary);

    return {
        taskSummary,
        isLoading,
        error,
        fetchTaskSummary
    }
}

export default useTaskSummary;