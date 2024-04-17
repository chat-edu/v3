import React from 'react';

import {Avatar, Button, Icon} from "@chakra-ui/react";

import { signIn } from "next-auth/react";

import {AuthProviderButton as AuthProviderButtonType} from "@/types/AuthProviderButton";

interface Props {
    provider: AuthProviderButtonType
}

const AuthProviderButton: React.FC<Props> = ({ provider }) => {
    return (
        <Button
            leftIcon={
                <Avatar
                    name={provider.title}
                    src={provider.icon}
                    boxSize={'24px'}
                />
            }
            onClick={() => signIn(provider.provider)}
            justifyContent={'flex-start'}
            flexShrink={0}
        >
            {provider.title}
        </Button>
    );
};

export default AuthProviderButton;
