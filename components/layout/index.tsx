import React from 'react';

import {Box, Flex} from "@chakra-ui/react";

import Navbar, {navbarHeight} from "@/components/layout/navbar";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/utilities/Loading";
import NotAuthenticated from "@/components/layout/NotAuthenticated";

interface Props {
    children: React.ReactElement,
    authGate?: boolean
}

const Layout: React.FC<Props> = ({ children, authGate }) => {

    const { user, isLoading } = useAuth();

    const { height } = useViewportDimensions();

    return (
        <Box
            h={height}
            backgroundSize={'cover'}
        >
            <Navbar />
            <Flex
                direction={'column'}
                gap={4}
                w={'100%'}
                h={`${height - navbarHeight}px`}
                position={'relative'}
                overflow={'auto'}
            >
                {
                    authGate ? (
                        <Loading
                            loading={isLoading}
                            h={'100%'}
                            w={'100%'}
                        >
                            {
                                user
                                    ? children
                                    : <NotAuthenticated />
                            }
                        </Loading>
                    ) : (
                        children
                    )
                }
            </Flex>
        </Box>
    );
};

export default Layout;
