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

import {NewTopic} from "@/llm/types/graphUpdates/NewTopic";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    newTopic: NewTopic
}

const NewTopicNodeModal: React.FC<Props> = ({ isOpen, onClose, newTopic }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Topic: {newTopic.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text
                        fontSize={'sm'}
                        color={'gray.500'}
                    >
                        Topic Content
                    </Text>
                    <Markdown>
                        {newTopic.text}
                    </Markdown>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default NewTopicNodeModal;
