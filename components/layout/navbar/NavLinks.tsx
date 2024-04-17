import React from 'react';

import {Stack} from "@chakra-ui/react";

import {useRouter} from "next/router";

import NavLink from "@/components/layout/navbar/NavLink";

import { NavLink as NavLinkType } from "@/types/NavLink";

const NavLinks = () => {

    const { pathname } = useRouter();

    return (
        <Stack
            direction={{
                base: 'column',
                md: 'row'
            }}
            flex={1}
        >
            {
                links.map((link, index) => (
                    <NavLink
                        key={index}
                        navLink={link}
                        active={pathname === link.href}
                    />
                ))
            }
        </Stack>
    );
};

const links: NavLinkType[] = [
    {
        label: 'Explore',
        href: '/'
    },
]

export default NavLinks;
