import React from 'react';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";

import {Topic} from "@/types/graph/Topic";
import useTopic from "@/hooks/queries/topics/useTopic";
import Loading from "@/components/utilities/Loading";
import TopicContent from "@/components/graph/topicContentModal/TopicContent";
import {Text} from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    topicId: Topic["id"]
}

const TopicContentModal: React.FC<Props> = ({ isOpen, onClose, topicId }) => {

    const { topic } = useTopic(topicId);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'6xl'}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent>
                <Loading loading={!topic}>
                    {
                        topic ? (
                            <TopicContent topic={topic} />
                        ) : (
                            <Text>
                                Loading...
                            </Text>
                        )
                    }
                </Loading>
            </ModalContent>
        </Modal>
    );
};

export default TopicContentModal;
