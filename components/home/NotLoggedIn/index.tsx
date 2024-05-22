import React from 'react';
import { Card, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Head from 'next/head';
import AuthProviderButtons from "@/components/utilities/authButtons/AuthProviderButtons";
import LandingGraph from "@/components/home/NotLoggedIn/LandingGraph";

const NotLoggedIn = () => {
  return (
    <>
      <Head>
        <title>ChatEDU - AI Study App for Students</title>
        <meta name="description" content="ChatEDU is an AI-powered study app designed to be your second brain. Enhance your learning with personalized assistance using ChatGPT technology." />
        <meta name="keywords" content="AI study app, free AI study app, ChatGPT for students, personalized learning, educational technology" />
        <meta property="og:title" content="ChatEDU - AI Study App for Students" />
        <meta property="og:description" content="ChatEDU is an AI-powered study app designed to be your second brain. Enhance your learning with personalized assistance using ChatGPT technology." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://chatedu.io" />
        <meta name="twitter:title" content="ChatEDU - AI Study App for Students" />
        <meta name="twitter:description" content="ChatEDU is an AI-powered study app designed to be your second brain. Enhance your learning with personalized assistance using ChatGPT technology." />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container
        maxW={'4xl'}
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
          <VStack spacing={0}>
            <Image
              src={'/logo.png'}
              alt={'ChatEDU logo'}
              boxSize={'100px'}
            />
            <Heading as="h1">
              <Text as='span'>Chat</Text>
              <Text as='span' color='brand.500'>EDU</Text>
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
    </>
  );
};

export default NotLoggedIn;
