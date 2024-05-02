import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Card, Text} from "@chakra-ui/react";

export const nodeWidth = 200;
export const nodeHeight = 100;

const ExistingTopicNode: ComponentType<NodeProps<string>> = (node) => {

    return (
        <>
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
            >
                <Text
                    fontSize={'xs'}
                    color={'gray.500'}
                >
                    Existing Topic
                </Text>
                <Text
                    fontSize={'md'}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    {node.data}
                </Text>
            </Card>
        </>
    );
};

export default ExistingTopicNode;
