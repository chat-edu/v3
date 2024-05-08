import React from 'react';

import {
    Button, Divider,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";

import {FiFile} from "react-icons/fi";
import {FaDownload, FaImage, FaMarkdown, FaVideo} from "react-icons/fa6";

import Link from "next/link";

import {GraphMedia as GraphMediaType} from "@/types/graph/GraphMedia";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import DeleteMediaButton from "@/components/utilities/graphMedia/DeleteMediaButton";
import Index from "@/components/utilities/graphMedia/GraphUpdates";

interface Props {
    graphMedia: GraphMediaType,
    analyzeButton: React.ReactNode,
    modalContent: React.ReactNode
}

const GraphMediaBase: React.FC<Props> = ({ graphMedia, analyzeButton, modalContent }) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={'2xl'}
                scrollBehavior={'inside'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{graphMedia.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDirection={'column'}
                        gap={4}
                    >
                        {modalContent}
                        <Divider />
                        {
                            graphMedia.processed ? <Index media={graphMedia} /> : null
                        }
                    </ModalBody>
                    <ModalFooter>
                        <HStack
                            w={'100%'}
                            justifyContent={'end'}
                        >
                            <DeleteMediaButton
                                media={graphMedia}
                            />
                            <Link
                                href={graphMedia.mediaUrl}
                            >
                                <Button
                                    colorScheme={'brand'}
                                    variant={'outline'}
                                    leftIcon={<FaDownload />}
                                >
                                    Download
                                </Button>
                            </Link>
                            {graphMedia.processed ? null : analyzeButton}
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <HStack
                spacing={2}
                w={'100%'}
                justifyContent={'space-between'}
                borderWidth={2}
                rounded={'md'}
                p={2}
                pl={4}
                _hover={{
                    borderColor: 'brand.500',
                }}
                cursor={'pointer'}
                onClick={onOpen}
                transition={'all 0.2s ease-in-out'}
            >
                <HStack
                    spacing={4}
                    flexShrink={1}
                >
                    <Icon
                        as={
                            graphMedia.mediaType === GraphMediaTypes.PDF
                                ? FiFile
                                : graphMedia.mediaType === GraphMediaTypes.Video
                                    ? FaVideo
                                    : graphMedia.mediaType === GraphMediaTypes.Image
                                        ? FaImage
                                        : FaMarkdown
                        }
                    />
                    <VStack
                        spacing={0}
                        alignItems={'flex-start'}
                        flex={1}
                    >
                        <Text
                            fontWeight={'semibold'}
                        >
                            {graphMedia.name}
                        </Text>
                        <Link
                            href={graphMedia.mediaUrl}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Text
                                fontSize={'sm'}
                                color={'gray.500'}
                                cursor={'pointer'}
                            >
                                Download
                            </Text>
                        </Link>=
                    </VStack>
                </HStack>
                {!graphMedia.processed && (
                    analyzeButton
                )}
            </HStack>
        </>
    );
};

export default GraphMediaBase;
