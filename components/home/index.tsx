import React from 'react';

import {Container} from "@chakra-ui/react";

import YourGraphs from "@/components/home/YourGraphs";
import YourTasks from "@/components/home/YourTasks";

const Home = () => {

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
