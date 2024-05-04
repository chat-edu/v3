import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Box, Text, useColorModeValue} from "@chakra-ui/react";
import {parentNodeHeight, userNodeWidth} from "@/components/home/NotLoggedIn/LandingGraph/nodes/consts";

const UserNode: ComponentType<NodeProps> = () => {
    return (
        <>
            <Handle
                type={"source"}
                position={Position.Right}
            />
            <Box
                borderWidth={4}
                rounded={'md'}
                h={`${parentNodeHeight}px`}
                w={`${userNodeWidth}px`}
                cursor={'pointer'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                pb={2}
                // @ts-ignore
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            >
                <Text
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                >
                    Student
                </Text>
            </Box>
        </>
    );
};

export default UserNode;
