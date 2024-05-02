export enum AuthProviders {
    GOOGLE = "google",
    MICROSOFT = "azure-ad",
    DEMO = "demo"
}

export interface AuthProviderButton {
    title: string,
    icon: string,
    provider: AuthProviders
}