import React from 'react';

import {
    Button,
    Heading,
    HStack,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "@chakra-ui/react";

import {FaWandMagicSparkles} from "react-icons/fa6";

import Editor from "@/components/utilities/editor";
import Markdown from "@/components/utilities/markdown";

import useEditTopicContent from "@/hooks/topic/useEditTopicContent";

import {Topic} from "@/types/graph/Topic";

interface Props {
    topic: Topic
}

const TopicContent: React.FC<Props> = ({ topic }) => {

    const {
        isEditing,
        setIsEditing,
        ref,
        markdown,
        setMarkdown,
        generateContent,
        isGeneratingContent,
        onSave
    } = useEditTopicContent(topic);

    return (
        <>
            <ModalHeader>
                <HStack
                    w={'100%'}
                    justifyContent={'space-between'}
                >
                    <Heading
                        size={'lg'}
                    >
                        {topic.name}
                    </Heading>
                    <HStack>
                        {
                            isEditing ? (
                                <>
                                    <Button
                                        onClick={generateContent}
                                        colorScheme={'brand'}
                                        variant={'outline'}
                                        leftIcon={<FaWandMagicSparkles />}
                                        isLoading={isGeneratingContent}
                                    >
                                        Generate
                                    </Button>
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        colorScheme={'brand'}
                                        variant={'outline'}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={onSave}
                                        colorScheme={'brand'}
                                        isDisabled={markdown === topic.text}
                                    >
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    colorScheme={'brand'}
                                >
                                    Edit
                                </Button>
                            )
                        }
                    </HStack>
                </HStack>
            </ModalHeader>
            <ModalBody>
                {
                    isEditing ? (
                        <Editor
                            markdown={markdown}
                            setMarkdown={setMarkdown}
                            ref={ref}
                        />
                    ) : (
                        <Markdown>
                            {topic.text}
                        </Markdown>
                    )
                }

            </ModalBody>
            <ModalFooter />
        </>
    );
};

export default TopicContent;
