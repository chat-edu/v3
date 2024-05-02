import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Button
} from '@chakra-ui/react';

import {Graph} from "@/types/graph/Graph";
import useDeleteGraph from "@/hooks/graph/useDeleteGraph";

interface Props {
    graphId: Graph['id']
}

const DeleteSubject: React.FC<Props> = ({ graphId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { onDelete } = useDeleteGraph(graphId);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Subject</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this subject? This action cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme={'red'}
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button
                colorScheme={'red'}
                onClick={onOpen}
                w={'100%'}
                variant={'ghost'}
            >
                Delete Subject
            </Button>
        </>
    );
};

export default DeleteSubject;
