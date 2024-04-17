import React from 'react'

import Profile from "@/components/layout/navbar/Profile";
import AuthProviderButtons from "@/components/utilities/authButtons/AuthProviderButtons";

import useAuth from "@/hooks/useAuth";

const AuthButton = () => {

    const { user } = useAuth();

    if(!user) {
        return (
            <AuthProviderButtons />
        )
    }

    return (
        <Profile
            user={user}
        />
    )
}

export default AuthButton