import { ClientSecretCredential } from '@azure/identity';

export async function getArmAccessToken(): Promise<string> {
    const tokenResponse = await new ClientSecretCredential(
        process.env.AZURE_TENANT_ID as string,
        process.env.AZURE_CLIENT_ID as string,
        process.env.AZURE_CLIENT_SECRET as string
    ).getToken(`${process.env.AZURE_RESOURCE_MANAGER as string}/.default`);
    return tokenResponse.token;
}

export async function getAccountAccessTokenAsync(armAccessToken: string, permissionType: string = 'Contributor', scope: string = 'Account', videoId?: string): Promise<string> {
    const headers = {
        'Authorization': `Bearer ${armAccessToken}`,
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        permissionType: permissionType,
        scope: scope,
        ...(videoId && { videoId: videoId })
    });

    const url = `${process.env.AZURE_RESOURCE_MANAGER as string}/subscriptions/${process.env.VIDEO_INDEXER_SUBSCRIPTION_ID as string}/resourceGroups/${process.env.VIDEO_INDEXER_RESOURCE_GROUP as string}/providers/Microsoft.VideoIndexer/accounts/${process.env.VIDEO_INDEXER_ACCOUNT_NAME as string}/generateAccessToken?api-version=2024-01-01`;

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data.accessToken;
}
