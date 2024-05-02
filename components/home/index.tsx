import React from 'react';

import {Container, Skeleton} from "@chakra-ui/react";

import YourGraphs from "@/components/home/YourGraphs";
import YourTasks from "@/components/home/YourTasks";
import useAuth from "@/hooks/useAuth";
import NotLoggedIn from "@/components/home/NotLoggedIn";

const Home = () => {

    const { user, isLoading } = useAuth();

    if(isLoading) return (
        <Skeleton
            h={'100%'}
            w={'100%'}
        />
    )

    if(!user) return (
        <NotLoggedIn />
    )

    return (
        <Container
            maxW={'4xl'}
            py={8}
            display={'flex'}
            flexDirection={'column'}
            gap={8}
        >
            <YourGraphs />
            <YourTasks />
        </Container>
    );
};

export default Home;
