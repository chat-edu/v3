import {useToast} from "@chakra-ui/react";

import {analyzeMedia} from "@/services/api/graphMedia";

import {GraphMedia} from "@/types/graph/GraphMedia";
import {useState} from "react";

const useAnalyzeGraphMedia = (graphMedia: GraphMedia) => {

    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const onAnalyze = async () => {
        setIsLoading(true);
        const result = await analyzeMedia(graphMedia);
        console.log(result);
        if(result) {
            toast({
                title: "Media analyzed",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error analyzing media",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
        setIsLoading(false);
    }

    return {
        onAnalyze,
        isLoading
    }
}

export default useAnalyzeGraphMedia;