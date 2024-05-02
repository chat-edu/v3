import {useRouter} from "next/navigation";

import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import {deleteGraph} from "@/services/api/graph";

import {Graph} from "@/types/graph/Graph";


const useDeleteGraph = (graphId: Graph["id"]) => {

    const { user } = useAuth();

    const toast = useToast();

    const router = useRouter();

    const onDelete = async () => {
        if(!user) return;
        const success = await deleteGraph(graphId, user.id);
        if(success) {
            router.push("/");
        } else {
            toast({
                title: "Failed to delete graph",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
    }

    return { onDelete }
}

export default useDeleteGraph;