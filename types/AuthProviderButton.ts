import {IconType} from "react-icons";

export enum AuthProviders {
    GOOGLE = "google",
}

export interface AuthProviderButton {
    title: string,
    icon: string,
    provider: AuthProviders
}