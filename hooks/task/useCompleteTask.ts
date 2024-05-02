import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {completeTask} from "@/services/api/task";

import {Task} from "@/types/task/Task";

const useCompleteTask = (taskId: Task["id"]) => {

    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const onComplete = async () => {
        setIsLoading(true);
        const success = await completeTask(taskId);
        if(success) {
            toast({
                title: "Task completed",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Failed to complete task",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    }

    return {
        onComplete,
        isLoading,
    }
}

export default useCompleteTask;