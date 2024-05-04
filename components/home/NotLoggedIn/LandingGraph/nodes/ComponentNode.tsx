import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Card, Icon, Text, Tooltip, VStack} from "@chakra-ui/react";

import {LandingNode as LandingNodeType} from "@/types/landing/LandingNode";
import {componentNodeHeight, componentNodeWidth} from "@/components/home/NotLoggedIn/LandingGraph/nodes/consts";

const getTargetPosition = (id: string) => {
    switch (id) {
        case 'graph':
            return Position.Right;
        case 'comprehension':
            return Position.Top;
        case 'agent':
            return Position.Left;
        case 'profile':
            return Position.Bottom;
        default:
            return Position.Bottom;
    }
}

const getSourcePosition = (id: string) => {
    switch (id) {
        case 'graph':
            return Position.Top;
        case 'comprehension':
            return Position.Left;
        case 'agent':
            return Position.Bottom;
        case 'profile':
            return Position.Right;
        default:
            return Position.Top;
    }
}

const ComponentNode: ComponentType<NodeProps<LandingNodeType>> = ({ data, id }) => {
    return (
        <>
            <Handle
                type={"target"}
                position={getTargetPosition(id)}
            />
            <Handle
                type={"source"}
                position={getSourcePosition(id)}
            />
            <Tooltip
                label={data.description}
                aria-label={data.description}
                textAlign={'center'}
            >
                <Card
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        borderColor: 'brand.500',
                        shadow: 'md'
                    }}
                    borderWidth={4}
                    h={`${componentNodeHeight}px`}
                    w={`${componentNodeWidth}px`}
                    p={0}
                    px={2}
                    justifyContent={'center'}
                    cursor={'pointer'}
                >
                    <VStack
                        w={'100%'}
                        spacing={0}
                    >
                        <Icon
                            as={data.icon}
                            boxSize={16}
                            mb={2}
                            color={'brand.500'}
                        />
                        <Text
                            fontSize={'lg'}
                            fontWeight={'bold'}
                            color={'brand.500'}
                        >
                            {data.title}
                        </Text>
                        <Text
                            fontSize={'sm'}
                            fontWeight={'bold'}
                            textAlign={'center'}
                        >
                            {data.subtitle}
                        </Text>
                    </VStack>
                </Card>
            </Tooltip>
        </>
    );
};

export default ComponentNode;
