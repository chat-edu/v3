import useRows from "@/hooks/queries/base/useRows";
import adaptTask from "@/hooks/queries/tasks/adapter";

import {Graph} from "@/types/graph/Graph";
import {User} from "@/types/User";

const useUserSubjectTasks = (userId: User["id"], subjectId: Graph["id"]) => {
    const [
        tasks,
        isLoading,
        error,
        fetchTasks
    ] = useRows(`/api/tasks/user/${userId}/subject/${subjectId}`, adaptTask);

    return {
        tasks,
        isLoading,
        error,
        fetchTasks
    }
}

export default useUserSubjectTasks;