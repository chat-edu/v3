export enum AuthProviders {
    GOOGLE = "google",
    MICROSOFT = "azure-ad",
}

export interface AuthProviderButton {
    title: string,
    icon: string,
    provider: AuthProviders
}