import React from 'react';

import {
    Avatar,
    Button,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useBreakpointValue
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

import {signOut} from "next-auth/react";

import {User} from "next-auth";

interface Props {
    user: User
}

const Profile: React.FC<Props> = ({ user }) => {

    const menuButton = useBreakpointValue({
        base: (
            <MenuButton
                display={{base: 'flex', md: 'none'}}
                as={IconButton}
                aria-label={'Profile '}
                icon={
                    <Avatar
                        size={'sm'}
                        name={user.image || user.name || ""}
                        src={user.image || ""}
                    />
                }
            />
        ),
        md: (
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                leftIcon={
                    <Avatar
                        size={'sm'}
                        name={user.name || ""}
                        src={user.image || ""}
                    />
                }
            >
                {user.name}
            </MenuButton>
        )
    })

    return (
        <HStack
            align={'end'}
        >
            <Menu>
                {menuButton}
                <MenuList>
                    <MenuItem
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );
};

export default Profile;
