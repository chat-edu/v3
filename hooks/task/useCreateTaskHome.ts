import useTaskInput from "@/hooks/task/useTaskInput";
import useCreatorGraphs from "@/hooks/queries/graphs/useCreatorGraphs";
import {useCurrentUser} from "@/contexts/CurrentUserContext";
import {useState} from "react";

const useCreateTaskHome = () => {

    const { user } = useCurrentUser();

    const { graphs, loading: graphsLoading } = useCreatorGraphs(user?.id || "");

    const [selectedGraphId, setSelectedGraphId] = useState<number | null>(null);

    const {
        task,
        setTask,
        isLoading: isSubmitting,
        onSubmit
    } = useTaskInput(selectedGraphId || 0);

    return {
        graphs,
        graphsLoading,
        selectedGraphId,
        setSelectedGraphId,
        task,
        setTask,
        isSubmitting,
        onSubmit
    }

}

export default useCreateTaskHome;