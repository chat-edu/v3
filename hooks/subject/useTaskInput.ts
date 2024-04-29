import {Graph} from "@/types/graph/Graph";
import {useState} from "react";

const useTaskInput = (subjectId: Graph["id"]) => {

    const [task, setTask] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        setIsLoading(true);



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