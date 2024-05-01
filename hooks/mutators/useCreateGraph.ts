import {useState} from "react";

import {useCurrentUser} from "@/contexts/CurrentUserContext";
import {createGraph} from "@/services/api/graph";
import {useToast} from "@chakra-ui/react";
import {createTopic} from "@/services/api/topic";

const useCreateGraph = () => {

    const toast = useToast();

    const { user } = useCurrentUser();

    const [graphName, setGraphName] = useState<string>('');

    const onSubmit = async () => {
        if(!graphName || !user) return;
        const newGraph = await createGraph({
            name: graphName,
            creator_id: user.id
        });
        if(newGraph !== null) {
            const newTopic = await createTopic({
                name: graphName,
                graph_id: newGraph.id,
                text: ''
            });
            if(newTopic !== null) {
                toast({
                    title: "Graph created.",
                    description: "Your graph has been created.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                return;
            }
        }
        toast({
            title: "Graph creation failed.",
            description: "An error occurred while creating your graph.",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }

    return {
        graphName,
        setGraphName,
        onSubmit,
        isDisabled: !graphName || !user
    }
}

export default useCreateGraph;