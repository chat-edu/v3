import React from 'react';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";

import Markdown from "@/components/utilities/markdown";

import {UpdatedTopic} from "@/llm/types/graphUpdates/UpdatedTopic";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    updatedTopic: UpdatedTopic
}

const UpdatedTopicNodeModal: React.FC<Props> = ({ isOpen, onClose, updatedTopic }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Updated Topic: {updatedTopic.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text
                        fontSize={'sm'}
                        color={'gray.500'}
                    >
                        Added Content
                    </Text>
                    <Markdown>
                        {updatedTopic.updatedText}
                    </Markdown>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default UpdatedTopicNodeModal;
