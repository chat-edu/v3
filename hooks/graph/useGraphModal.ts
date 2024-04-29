
import {useToast} from "@chakra-ui/react";

import useGraph from "@/hooks/queries/graphs/useGraph";

import useGraphTopics from "@/hooks/queries/topics/useGraphTopics";
import useAuth from "@/hooks/useAuth";
import useUserSubjectTasks from "@/hooks/queries/tasks/useUserSubjectTasks";

import { deleteGraph as deleteGraphService } from "@/services/graph";

import {Graph} from "@/types/graph/Graph";


const useGraphModal = (graphId: Graph["id"]) => {

    const { user } = useAuth();

    const toast = useToast();

    const { graph, loading: isGraphLoading } = useGraph(graphId);

    const { topics, loading: isTopicsLoading } = useGraphTopics(graphId);

    const { tasks, isLoading: isTasksLoading } = useUserSubjectTasks(user?.id || "", graphId);

    const deleteGraph = async () => {
        const success = await deleteGraphService(graphId, user?.id || "");
        if(success) {
            toast({
                title: "Graph deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Failed to delete graph.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        return success;
    }

    return {
        graph,
        topics,
        tasks,
        isLoading: isGraphLoading || isTopicsLoading || isTasksLoading,
        deleteGraph,
    }
}

export default useGraphModal;