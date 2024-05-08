import useRow from "@/hooks/queries/base/useRow";

import {Task} from "@/types/task/Task";
import {TaskProgress} from "@/types/task/TaskProgress";

const adaptTaskProgress = (task: TaskProgress): TaskProgress => task;

const useTaskProgress = (taskId: Task["id"]) => {

    const [
        taskProgress,
        isLoading
    ] = useRow(`/api/tasks/${taskId}/progress`, adaptTaskProgress);

    return {
        taskProgress,
        isLoading
    }
}

export default useTaskProgress;