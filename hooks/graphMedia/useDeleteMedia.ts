
import {useToast} from "@chakra-ui/react";

import {deleteMedia} from "@/services/api/graphMedia";

import {GraphMedia} from "@/types/graph/GraphMedia";

const useDeleteMedia = (media: GraphMedia) => {


    const toast = useToast();

    const onDelete = async () => {
        const success = await deleteMedia(media.id, media.graphId);
        if (success) {
            toast({
                title: "Media deleted",
                status: "success",
                isClosable: true,
            });
        } else {
            toast({
                title: "Failed to delete media",
                status: "error",
                isClosable: true,
            });
        }
    }

    return {
        onDelete
    };
}

export default useDeleteMedia;