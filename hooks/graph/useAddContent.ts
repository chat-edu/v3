import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {uploadMedia} from "@/services/api/graphMedia";

import {Graph} from "@/types/graph/Graph";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";

const useAddContent = (graphId: Graph["id"], onClose: () => void) => {

    const toast = useToast();

    const [file, setFile] = useState<File | null>(null);
    const [isFileProcessing, setIsFileProcessing] = useState<boolean>(false);

    const [image, setImage] = useState<File | null>(null);
    const [isImageProcessing, setIsImageProcessing] = useState<boolean>(false);

    const [video, setVideo] = useState<File | null>(null);
    const [isVideoProcessing, setIsVideoProcessing] = useState<boolean>(false);

    const onSubmitPdf = async () => {
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
        const result = await uploadMedia(graphId, file, GraphMediaTypes.PDF);
        if (result) {
            toast({
                title: "PDF uploaded",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            setFile(null);
            onClose();
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

    const onSubmitImage = async () => {
        if (!image) {
            toast({
                title: "No image selected",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            return;
        }
        setIsImageProcessing(true);
        const result = await uploadMedia(graphId, image, GraphMediaTypes.Image);
        if (result) {
            toast({
                title: "Image uploaded",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            setImage(null)
            onClose();
        } else {
            toast({
                title: "Failed to upload image",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
        setIsImageProcessing(false);
    }

    const onSubmitVideo = async () => {
        if (!video) {
            toast({
                title: "No video selected",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            return;
        }
        setIsVideoProcessing(true);
        const result = await uploadMedia(graphId, video, GraphMediaTypes.Video);
        if (result) {
            toast({
                title: "Video uploaded",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            setVideo(null);
            onClose();
        } else {
            toast({
                title: "Failed to upload video",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
        setIsVideoProcessing(false);
    }

    return {
        file,
        isFileProcessing,
        setFile,
        image,
        isImageProcessing,
        setImage,
        video,
        isVideoProcessing,
        setVideo,
        onSubmitPdf,
        onSubmitImage,
        onSubmitVideo
    }
}

export default useAddContent;