import React from 'react';

import {HStack} from "@chakra-ui/react";

import AuthProviderButton from "@/components/utilities/authButtons/AuthProviderButtons/AuthProviderButton";

import authProviderButtons from "@/components/utilities/authButtons/buttons";

const AuthProviderButtons: React.FC = () => {
    return (
        <HStack>
            {
                authProviderButtons.map(providerButton => (
                    <AuthProviderButton
                        key={providerButton.title}
                        provider={providerButton}
                    />
                ))
            }
        </HStack>
    )
};

export default AuthProviderButtons;