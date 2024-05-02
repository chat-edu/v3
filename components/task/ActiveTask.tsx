import React from 'react';

import {mobileNavbarHeight, navbarHeight} from "@/components/layout/navbar";
import {Container, Flex, HStack, VStack} from "@chakra-ui/react";

import TaskGraph from "@/components/task/TaskGraph";
import TaskChat from "@/components/task/TaskChat";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

const ActiveTask = () => {

    const { height } = useViewportDimensions();

    return (
        <VStack
            w={'100%'}
            p={4}
            h={{
                base: height - mobileNavbarHeight,
                md: height - navbarHeight
            }}
        >
            <HStack
                flex={1}
                w={'100%'}
                h={'100%'}
                maxH={'100%'}
            >
                <TaskGraph />
                <Container
                    flex={1}
                    maxW={'6xl'}
                    p={0}
                    h={'100%'}
                >
                    <Flex
                        flexDirection={'column'}
                        w={'100%'}
                        position={'relative'}
                        overflow={'auto'}
                        maxH={'100%'}
                        h={'100%'}
                    >
                        <TaskChat />
                    </Flex>
                </Container>
            </HStack>
        </VStack>
    );
};

export default ActiveTask;
