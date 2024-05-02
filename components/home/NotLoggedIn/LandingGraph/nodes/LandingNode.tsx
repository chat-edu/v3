import React, {ComponentType} from 'react';

import {Handle, NodeProps, Position} from "reactflow";

import {Card, Icon, Text, Tooltip, VStack} from "@chakra-ui/react";

import {LandingNode as LandingNodeType} from "@/types/landing/LandingNode";

export const landingNodeHeight = 175;
export const landingNodeWidth = 250;

const LandingNode: ComponentType<NodeProps<LandingNodeType>> = ({ data, id }) => {
    return (
        <>
            {
                id !== 'files' && id !== 'graph' && (
                    <Handle
                        type={"target"}
                        position={Position.Left}
                    />
                )
            }
            {
                id !== 'comprehension' && (
                    <Handle
                        type={"source"}
                        position={Position.Right}
                    />
                )
            }
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
                    h={`${landingNodeHeight}px`}
                    w={`${landingNodeWidth}px`}
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

export default LandingNode;
