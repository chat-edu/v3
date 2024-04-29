import useRows from "@/hooks/queries/base/useRows";
import adaptTask from "@/hooks/queries/tasks/adapter";

import {User} from "@/types/User";

const useUserTasks = (userId: User["id"]) => {
    const [
        tasks,
        isLoading,
        error,
        fetchTasks
    ] = useRows(`/api/tasks/user/${userId}`, adaptTask);

    return {
        tasks,
        isLoading,
        error,
        fetchTasks
    }
}

export default useUserTasks;