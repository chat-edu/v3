import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Box, Text} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

export const secondBrainNodeHeight = 500;
export const secondBrainNodeWidth = 1200;

const SecondBrainNode: ComponentType<NodeProps> = () => {
    return (
        <>
            <Handle
                type={"target"}
                position={Position.Left}
            />
            <Box
                borderColor={'brand.500'}
                borderWidth={4}
                rounded={'md'}
                h={`${secondBrainNodeHeight}px`}
                w={`${secondBrainNodeWidth}px`}
                cursor={'pointer'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                pb={2}
                // @ts-ignore
                bg={transparentize('brand.500', 0.1)}
            >
                <Text
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    color={'brand.500'}
                >
                    Second Brain
                </Text>
            </Box>
        </>
    );
};

export default SecondBrainNode;
