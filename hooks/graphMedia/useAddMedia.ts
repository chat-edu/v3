import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {uploadMedia} from "@/services/api/graphMedia";

import {Graph} from "@/types/graph/Graph";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";

const useAddMedia = (graphId: Graph["id"], mediaType: GraphMediaTypes) => {

    const toast = useToast();

    const [isFileProcessing, setIsFileProcessing] = useState<boolean>(false);

    const addFile = async (file: File) => {
        if (!file) {
            toast({
                title: "No file selected",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            return;
        }
        setIsFileProcessing(true);
        const result = await uploadMedia(graphId, file, mediaType);
        if (result) {
            toast({
                title: "PDF uploaded",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        } else {
            toast({
                title: "Failed to upload PDF",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
        setIsFileProcessing(false);
    }

    return {
        addFile,
        isFileProcessing
    }
}

export default useAddMedia;