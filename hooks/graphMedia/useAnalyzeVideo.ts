import {useEffect, useState} from "react";

import useAnalyzeGraphMedia from "@/hooks/graphMedia/useAnalyzeGraphMedia";

import {getVideoState} from "@/services/api/graphMedia";

import {GraphMedia} from "@/types/graph/GraphMedia";
import {useToast} from "@chakra-ui/react";

const useAnalyzeVideo = (media: GraphMedia) => {

    const toast = useToast();

    const { onAnalyze, isLoading} = useAnalyzeGraphMedia(media);

    const [isVideoProcessingLoading, setIsVideoProcessingLoading] = useState(true);
    const [isVideoProcessing, setIsVideoProcessing] = useState(true);

    const checkVideoState = async () => {
        const videoState = await getVideoState(media.id);
        if(videoState === "Processed") {
            setIsVideoProcessing(false);
            if(!isVideoProcessingLoading) {
                toast({
                    title: "Video processed!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            setTimeout(() => {
                checkVideoState();
            }, 3000);
        }
        setIsVideoProcessingLoading(false);
    }

    useEffect(() => {
        checkVideoState();
    }, []);

    return {
        isVideoProcessing,
        isVideoProcessingLoading,
        onAnalyze,
        isLoading
    }
}

export default useAnalyzeVideo;