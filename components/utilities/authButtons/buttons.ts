import {AuthProviderButton, AuthProviders} from "@/types/AuthProviderButton";

const authProviderButtons: AuthProviderButton[] = [
    {
        title: "Demo Account",
        icon: "/logo.png",
        provider: AuthProviders.DEMO
    },
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