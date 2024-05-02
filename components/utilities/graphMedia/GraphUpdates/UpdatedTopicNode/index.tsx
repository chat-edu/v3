import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Card, Text, useDisclosure} from "@chakra-ui/react";

import {UpdatedTopic} from "@/llm/types/graphUpdates/UpdatedTopic";
import UpdatedTopicNodeModal
    from "@/components/utilities/graphMedia/GraphUpdates/UpdatedTopicNode/UpdatedTopicNodeModal";

export const nodeWidth = 200;
export const nodeHeight = 100;

const UpdatedTopicNode: ComponentType<NodeProps<UpdatedTopic>> = (node) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <UpdatedTopicNodeModal
                isOpen={isOpen}
                onClose={onClose}
                updatedTopic={node.data}
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
                    Updated Topic
                </Text>
                <Text
                    fontSize={'md'}
                    fontWeight={'bold'}
                    textAlign={'center'}
                    lineHeight={1}
                >
                    {node.data.name}
                </Text>
            </Card>
        </>
    );
};

export default UpdatedTopicNode;
