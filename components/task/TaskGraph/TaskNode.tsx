import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Card, Text, useDisclosure} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

import TopicContentModal from "@/components/graph/topicContentModal";

import {useTaskContext} from "@/contexts/TaskContext";

import {Topic as TopicNodeType} from "@/types/graph/Topic";

export const nodeWidth = 200;
export const nodeHeight = 100;

const TopicNode: ComponentType<NodeProps<TopicNodeType>> = (node) => {

    const { taskTopics, currentTopicIndex, correctAnswersByTopic } = useTaskContext();

    const topicIndex = taskTopics.findIndex(topic => topic.id === node.data.id);

    const numCorrect = correctAnswersByTopic.length > topicIndex ? correctAnswersByTopic[topicIndex] : 0;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
            />
            <Handle
                type="source"
                position={Position.Bottom}
            />
            <TopicContentModal
                isOpen={isOpen}
                onClose={onClose}
                topicId={node.data.id}
            />
            <Card
                onClick={onOpen}
                w={`${nodeWidth}px`}
                h={`${nodeHeight}px`}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth={2}
                borderColor={taskTopics[currentTopicIndex].id === node.data.id ? 'brand.500' : 'gray.500'}
                transition={'all 0.3s ease-in-out'}
                transform={taskTopics[currentTopicIndex].id === node.data.id ? 'scale(1.1)' : 'none'}
                // @ts-ignore
                backgroundColor={numCorrect === 0 ? undefined : transparentize('brand.500', numCorrect / 3)}
            >
                <Text
                    fontSize={'md'}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    {node.data.name}
                </Text>
            </Card>
        </>
    );
};

export default TopicNode;
