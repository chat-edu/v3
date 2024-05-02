import React from 'react';

import {Card, Container, Heading, Image, Text, VStack} from "@chakra-ui/react";

import AuthProviderButtons from "@/components/utilities/authButtons/AuthProviderButtons";
import LandingGraph from "@/components/home/NotLoggedIn/LandingGraph";

const NotLoggedIn = () => {
    return (
        <Container
            maxW={'6xl'}
            w={'100%'}
            h={'100%'}
            py={8}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
        >
            <Card
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
                p={8}
            >
                <VStack
                    spacing={0}
                >
                    <Image
                        src={'/logo.png'}
                        alt={'logo'}
                        boxSize={'100px'}
                    />
                    <Heading>
                        <Text
                            as='span'
                        >
                            Chat
                        </Text>
                        <Text
                            as='span'
                            color='brand.500'
                        >
                            EDU
                        </Text>
                    </Heading>
                    <Text
                        fontSize={'lg'}
                        opacity={0.7}
                        fontWeight={'bold'}
                    >
                        A Second Brain for Students
                    </Text>
                </VStack>
                <AuthProviderButtons />
                <LandingGraph />
            </Card>
        </Container>
    );
};

export default NotLoggedIn;
