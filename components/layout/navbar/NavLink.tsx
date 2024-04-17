import React from 'react';

import Link from "next/link";

import {Button} from "@chakra-ui/react";

import {NavLink as NavLinkType} from "@/types/NavLink";

interface Props {
    navLink: NavLinkType;
    active: boolean;
}

const NavLink: React.FC<Props> = ({ navLink, active }) => {
    return (
        <Link
            href={navLink.href}
        >
            <Button
                variant={active ? 'outline' : 'ghost'}
                colorScheme={active ? 'brand' : undefined}
                size={'sm'}
            >
                {navLink.label}
            </Button>
        </Link>
    );
};

export default NavLink;
