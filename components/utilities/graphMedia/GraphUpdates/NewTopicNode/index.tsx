import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Card, Text, useDisclosure} from "@chakra-ui/react";

import {NewTopic} from "@/llm/types/graphUpdates/NewTopic";
import NewTopicNodeModal
    from "@/components/utilities/graphMedia/GraphUpdates/NewTopicNode/NewTopicNodeModal";

export const nodeWidth = 200;
export const nodeHeight = 100;

const NewTopicNode: ComponentType<NodeProps<NewTopic>> = (node) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <NewTopicNodeModal
                isOpen={isOpen}
                onClose={onClose}
                newTopic={node.data}
            />
            <Handle
                type="target"
                position={Position.Left}
            />
            <Handle
                type="source"
                position={Position.Right}
            />
            <Card
                w={`${nodeWidth}px`}
                h={`${nodeHeight}px`}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth={2}
                display={'flex'}
                flexDirection={'column'}
                borderColor={'brand.500'}
                onClick={onOpen}
            >
                <Text
                    fontSize={'xs'}
                    color={'gray.500'}
                >
                    New Topic
                </Text>
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

export default NewTopicNode;
