import useRows from "@/hooks/queries/base/useRows";
import adaptTask from "@/hooks/queries/tasks/adapter";

import {User} from "@/types/User";
import {useCallback, useEffect} from "react";
import {subscribeToUserTasksChangedEvent, unsubscribeFromUserTasksChangedEvent} from "@/events/userTasksChanged";

const useUserTasks = (userId: User["id"]) => {
    const [
        tasks,
        isLoading,
        error,
        fetchTasks
    ] = useRows(`/api/tasks/user/${userId}`, adaptTask);

    const handleTasksChanged = useCallback((changedUserId: User["id"]) => {
        if(userId === changedUserId) {
            fetchTasks();
        }
    }, [userId, fetchTasks]);

    useEffect(() => {
        subscribeToUserTasksChangedEvent(handleTasksChanged);
        return () => {
            unsubscribeFromUserTasksChangedEvent(handleTasksChanged);
        }
    }, []);

    return {
        tasks,
        isLoading,
        error,
        fetchTasks
    }
}

export default useUserTasks;