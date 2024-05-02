import React from 'react';

import {
    Button,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack
} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";

import {FiFile} from "react-icons/fi";
import {FaImage, FaVideo} from "react-icons/fa6";

import FileInput from "@/components/utilities/forms/FIleInput";

import useAddContent from "@/hooks/graph/useAddContent";

import {Graph} from "@/types/graph/Graph";
import {ModalFooter} from "@chakra-ui/modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    graphId: Graph['id']
}

const UploadModal: React.FC<Props> = ({ isOpen, onClose, graphId }) => {

    const {
        file,
        isFileProcessing,
        setFile,
        onSubmitPdf,
        video,
        isVideoProcessing,
        setVideo,
        onSubmitVideo,
        image,
        isImageProcessing,
        setImage,
        onSubmitImage
    } = useAddContent(graphId, onClose);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'2xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload Content</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        spacing={4}
                        w={'100%'}
                        alignItems={'flex-start'}
                    >
                        <VStack
                            spacing={2}
                            w={'100%'}
                            alignItems={'flex-start'}
                        >
                            <Text
                                fontSize={'lg'}
                                fontWeight={'bold'}
                            >
                                Upload PDF
                            </Text>
                            <HStack
                                w={'100%'}
                            >
                                <FileInput
                                    text={file ? file.name : 'Upload PDF'}
                                    setFile={setFile}
                                    accept={'application/pdf'}
                                    icon={FiFile}
                                    isDisabled={isFileProcessing}
                                />
                                {
                                    file && (
                                        <>
                                            <IconButton
                                                onClick={() => setFile(null)}
                                                aria-label={'Remove File'}
                                                icon={<CloseIcon />}
                                                colorScheme={'red'}
                                                variant={'outline'}
                                                isDisabled={isFileProcessing}
                                            />
                                            <Button
                                                onClick={onSubmitPdf}
                                                colorScheme={'brand'}
                                                isLoading={isFileProcessing}
                                            >
                                                Upload
                                            </Button>
                                        </>

                                    )
                                }
                            </HStack>
                            <Text
                                fontSize={'sm'}
                                color={'gray.500'}
                            >
                                Add a PDF (syllabus, lecture slides, problem sets, etc.) to update your knowledge graph.
                            </Text>
                        </VStack>
                        <VStack
                            spacing={2}
                            w={'100%'}
                            alignItems={'flex-start'}
                        >
                            <Text
                                fontSize={'lg'}
                                fontWeight={'bold'}
                            >
                                Add Video
                            </Text>
                            <HStack
                                w={'100%'}
                            >
                                <FileInput
                                    setFile={setVideo}
                                    text={video ? video.name : 'Upload Video'}
                                    accept={'video/*'}
                                    icon={FaVideo}
                                    isDisabled={isVideoProcessing}
                                />
                                {
                                    video && (
                                        <>
                                            <IconButton
                                                onClick={() => setVideo(null)}
                                                aria-label={'Remove Video'}
                                                icon={<CloseIcon />}
                                                colorScheme={'red'}
                                                variant={'outline'}
                                                isDisabled={isVideoProcessing}
                                            />
                                            <Button
                                                colorScheme={'brand'}
                                                onClick={onSubmitVideo}
                                                isLoading={isVideoProcessing}
                                            >
                                                Upload
                                            </Button>
                                        </>
                                    )
                                }
                            </HStack>
                            <Text
                                fontSize={'sm'}
                                color={'gray.500'}
                            >
                                Add a video (lecture, online course, etc.) to update your knowledge graph.
                            </Text>
                        </VStack>
                        <VStack
                            spacing={2}
                            w={'100%'}
                            alignItems={'flex-start'}
                        >
                            <Text
                                fontSize={'lg'}
                                fontWeight={'bold'}
                            >
                                Add Image
                            </Text>
                            <HStack
                                w={'100%'}
                            >
                                <FileInput
                                    setFile={setImage}
                                    text={image ? image.name : 'Upload Image'}
                                    accept={'image/*'}
                                    icon={FaImage}
                                    isDisabled={isImageProcessing}
                                />
                                {
                                    image && (
                                        <>
                                            <IconButton
                                                onClick={() => setImage(null)}
                                                aria-label={'Remove Image'}
                                                icon={<CloseIcon />}
                                                colorScheme={'red'}
                                                variant={'outline'}
                                                isDisabled={isImageProcessing}
                                            />
                                            <Button
                                                colorScheme={'brand'}
                                                onClick={onSubmitImage}
                                                isLoading={isImageProcessing}
                                            >
                                                Upload
                                            </Button>
                                        </>
                                    )
                                }
                            </HStack>
                            <Text
                                fontSize={'sm'}
                                color={'gray.500'}
                            >
                                Add an image (diagram, chart, etc.) to update your knowledge graph.
                            </Text>
                        </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default UploadModal;
