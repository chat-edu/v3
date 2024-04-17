import React from 'react';

import {Card, Container, Heading, Text, VStack} from "@chakra-ui/react";
import AuthProviderButtons from "@/components/utilities/authButtons/AuthProviderButtons";

const NotAuthenticated = () => {
    return (
        <Container
            maxW={'2xl'}
            h={'100%'}
            display={'flex'}
            flexDir={'column'}
            justifyContent={'center'}
        >
            <Card
                w={'100%'}
            >
                <VStack
                    w={'100%'}
                    spacing={4}
                >
                    <Heading>
                        Not Logged In
                    </Heading>
                    <Text>
                        You must be logged in to view this page.
                    </Text>
                    <AuthProviderButtons />
                </VStack>
            </Card>
        </Container>
    );
};

export default NotAuthenticated;
