import {Graph} from "@/types/graph/Graph";
import {useState} from "react";
import {createTask} from "@/services/api/task";
import useAuth from "@/hooks/useAuth";
import {useToast} from "@chakra-ui/react";

const useTaskInput = (subjectId: Graph["id"]) => {

    const toast = useToast();

    const { user } = useAuth();

    const [task, setTask] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {

        if(!task || !user) return;

        setIsLoading(true);

        const taskRow = await createTask({
            graph_id: subjectId,
            text: task,
            creator_id: user.id,
            completed: false
        });

        if(taskRow) {
            toast({
                title: "Task created.",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        } else {
            toast({
                title: "Failed to create task.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }

        setIsLoading(false);
    }

    return {
        task,
        setTask,
        isLoading,
        onSubmit
    }
}

export default useTaskInput;