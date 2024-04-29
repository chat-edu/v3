import {useCallback, useEffect} from "react";

import useRows from "@/hooks/queries/base/useRows";
import adaptTask from "@/hooks/queries/tasks/adapter";

import {subscribeToSubjectTasksChangedEvent, unsubscribeFromSubjectTasksChangedEvent} from "@/events/subjectTasksChanged";

import {Graph} from "@/types/graph/Graph";
import {User} from "@/types/User"

const useUserSubjectTasks = (userId: User["id"], subjectId: Graph["id"]) => {
    const [
        tasks,
        isLoading,
        error,
        fetchTasks
    ] = useRows(`/api/tasks/user/${userId}/subject/${subjectId}`, adaptTask);

    const handleTasksChanged = useCallback((changedSubjectId: Graph["id"]) => {
        if(subjectId === changedSubjectId) {
            fetchTasks();
        }
    }, [subjectId, fetchTasks]);

    useEffect(() => {
        subscribeToSubjectTasksChangedEvent(handleTasksChanged);
        return () => {
            unsubscribeFromSubjectTasksChangedEvent(handleTasksChanged);
        }
    }, []);

    return {
        tasks,
        isLoading,
        error,
        fetchTasks
    }
}

export default useUserSubjectTasks;