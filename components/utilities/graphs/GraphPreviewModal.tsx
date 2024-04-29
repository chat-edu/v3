import React from 'react';

import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Text,
    VStack
} from "@chakra-ui/react";

import Link from "next/link";

import TaskCard from "@/components/task/TaskCard";

import useGraphModal from "@/hooks/graph/useGraphModal";

import {Graph} from "@/types/graph/Graph";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    graphId: Graph['id'];
}

const GraphPreviewModal: React.FC<Props> = ({ isOpen, onClose, graphId }) => {

    const { deleteGraph, graph, isLoading, topics, tasks} = useGraphModal(graphId)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {
                    isLoading || !graph ? (
                        <Skeleton
                            height={'200px'}
                            width={'100%'}
                        />
                    ) : (
                        <>
                            <ModalHeader>{graph.name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <VStack
                                    spacing={4}
                                    w={'100%'}
                                    alignItems={'flex-start'}
                                >
                                    <VStack
                                        w={'100%'}
                                        alignItems={'flex-start'}
                                        spacing={4}
                                    >
                                        <Text
                                            fontWeight={'bold'}
                                            fontSize={'lg'}
                                        >
                                            {topics.length} Topics
                                        </Text>
                                        <VStack
                                            w={'100%'}
                                            alignItems={'flex-start'}
                                            spacing={2}
                                        >
                                            <Text
                                                fontWeight={'bold'}
                                                fontSize={'lg'}
                                            >
                                                Tasks
                                            </Text>
                                            {
                                                tasks.length === 0 ? (
                                                    <Text>
                                                        No tasks
                                                    </Text>
                                                ) : (
                                                    tasks.map(task => (
                                                        <TaskCard task={task} key={task.id} />
                                                    ))
                                                )
                                            }
                                        </VStack>
                                    </VStack>
                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                                <HStack
                                    spacing={4}
                                    w={'100%'}
                                >
                                    <Button
                                        colorScheme='red'
                                        onClick={deleteGraph}
                                        variant={'outline'}
                                        flex={1}
                                    >
                                        Delete
                                    </Button>
                                    <Link
                                        href={`/subject/${graphId}`}
                                        passHref
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Button
                                            colorScheme='brand'
                                            w={'100%'}
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </HStack>
                            </ModalFooter>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    );
};

export default GraphPreviewModal;
