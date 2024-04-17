import React from 'react';

import {Container} from "@chakra-ui/react";

import YourGraphs from "@/components/home/YourGraphs";

const Home = () => {

    return (
        <Container
            maxW={'4xl'}
            py={8}
        >
            <YourGraphs />
        </Container>
    );
};

export default Home;
