import React from 'react';

import {ModalBody, ModalCloseButton, ModalFooter, ModalHeader} from "@chakra-ui/modal";

import {Topic} from "@/types/graph/Topic";
import Editor from "@/components/utilities/editor";
import {updateTopic} from "@/services/topic";
import {useToast} from "@chakra-ui/react";

interface Props {
    topic: Topic
}

const TopicContent: React.FC<Props> = ({ topic }) => {


    return (
        <>
            <ModalHeader>{topic.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Editor
                    topic={topic}
                />
            </ModalBody>
            <ModalFooter />
        </>
    );
};

export default TopicContent;
