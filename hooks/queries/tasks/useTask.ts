import useRow from "@/hooks/queries/base/useRow";
import adaptTask from "@/hooks/queries/tasks/adapter";

import {Task} from "@/types/Task";

const useTask = (taskId: Task["id"]) => {
    const [
        task,
        isLoading,
        error,
        fetchTask
    ] = useRow(`/api/tasks/${taskId}`, adaptTask);

    return {
        task,
        isLoading,
        error,
        fetchTask
    }
}

export default useTask;