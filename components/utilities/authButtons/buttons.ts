import {AuthProviderButton, AuthProviders} from "@/types/AuthProviderButton";

const authProviderButtons: AuthProviderButton[] = [
    {
        title: "Sign in with Microsoft",
        icon: "/microsoft.png",
        provider: AuthProviders.MICROSOFT
    },
    {
        title: "Sign in with Google",
        icon: "/google.png",
        provider: AuthProviders.GOOGLE
    }
]

export default authProviderButtons;