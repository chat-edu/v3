import {useCallback, useEffect} from "react";

import useRow from "@/hooks/queries/base/useRow";
import adaptTask from "@/hooks/queries/tasks/adapter";

import {subscribeToTaskChangedEvent, unsubscribeFromTaskChangedEvent} from "@/events/taskChanged";

import {Task} from "@/types/task/Task";

const useTask = (taskId: Task["id"]) => {
    const [
        task,
        isLoading,
        error,
        fetchTask
    ] = useRow(`/api/tasks/${taskId}`, adaptTask);

    const handleTaskChanged = useCallback((changedTaskId: Task["id"]) => {
        if(taskId === changedTaskId) {
            fetchTask();
        }
    }, [taskId]);

    useEffect(() => {
        subscribeToTaskChangedEvent(handleTaskChanged);
        return () => {
            unsubscribeFromTaskChangedEvent(handleTaskChanged);
        }
    }, []);

    return {
        task,
        isLoading,
        error,
        fetchTask
    }
}

export default useTask;