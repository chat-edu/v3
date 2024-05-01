import { getArmAccessToken, getAccountAccessTokenAsync } from './accountTokenProvider';

const authenticateAsync = async () => {
    const armAccessToken = await getArmAccessToken();
    const viAccessToken = await getAccountAccessTokenAsync(armAccessToken);
    return { armAccessToken, viAccessToken };
}

const getAccountAsync = async (armAccessToken: string) => {

    const headers = {
        'Authorization': `Bearer ${armAccessToken}`,
        'Content-Type': 'application/json'
    };

    const url = `${process.env.AZURE_RESOURCE_MANAGER as string}/subscriptions/${process.env.VIDEO_INDEXER_SUBSCRIPTION_ID as string}/resourceGroups/${process.env.VIDEO_INDEXER_RESOURCE_GROUP as string}/providers/Microsoft.VideoIndexer/accounts/${process.env.VIDEO_INDEXER_ACCOUNT_NAME as string}?api-version=2024-01-01`;

    const response = await fetch(url, { headers: headers });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const uploadUrlAsync = async (videoName: string, videoUrl: string) => {
    if (!/^https?:\/\//i.test(videoUrl)) {
        throw new Error('Invalid video URL');
    }
    const { armAccessToken, viAccessToken } = await authenticateAsync();
    const account = await getAccountAsync(armAccessToken);

    const excludedAA = [
        "Faces",
        "ObservedPeople",
        "Emotions",
        "RollingCredits",
        "DetectedObjects",
        "Celebrities",
        "KnownPeople",
        "Clapperboard",
        "Logos",
        "FeaturedClothing",
        "MatchedPerson",
        "ShotType",
        "PeopleDetectedClothing"
    ]

    const params = new URLSearchParams({
        name: videoName,
        privacy: "private",
        videoUrl: videoUrl,
        excludedAI: excludedAA.join(',')
    });

    const url = `${process.env.VIDEO_INDEXER_API_ENDPOINT as string}/${account.location}/Accounts/${account.properties.accountId}/Videos?accessToken=${encodeURIComponent(viAccessToken)}&${params.toString()}`;

    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const videoId = data.id;

    return videoId as string;
}

export const waitForIndexAsync = async (videoId: string) => {
    const { armAccessToken, viAccessToken } = await authenticateAsync();
    const account = await getAccountAsync(armAccessToken);
    let processing = true;
    while (processing) {
        const url = `${process.env.VIDEO_INDEXER_API_ENDPOINT as string}/${account.location}/Accounts/${account.properties.accountId}/Videos/${videoId}/Index?accessToken=${encodeURIComponent(viAccessToken)}`;

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const videoResult = await response.json();
        const videoState = videoResult.state;

        if (videoState === 'Processed') {
            processing = false;
            return;
        } else if (videoState === 'Failed') {
            processing = false;
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 10000)); // wait 10 seconds before checking again
    }
}

export const getVideoState = async (videoId: string) => {
    const { armAccessToken, viAccessToken } = await authenticateAsync();
    const account = await getAccountAsync(armAccessToken);
    const url = `${process.env.VIDEO_INDEXER_API_ENDPOINT as string}/${account.location}/Accounts/${account.properties.accountId}/Videos/${videoId}/Index?accessToken=${encodeURIComponent(viAccessToken)}`;
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return null;
    const videoResult = await response.json();
    return videoResult.state;
}

export const getVideoAsync = async (videoId: string) => {
    const { armAccessToken, viAccessToken } = await authenticateAsync();
    const account = await getAccountAsync(armAccessToken);

    const params = new URLSearchParams({
        videoId,
    });

    const url = `${process.env.VIDEO_INDEXER_API_ENDPOINT as string}/${account.location}/Accounts/${account.properties.accountId}/Videos/Search?accessToken=${encodeURIComponent(viAccessToken)}&${params.toString()}`;

    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const getVideoIndexAsync = async (videoId: string, language: string = 'English') => {

    await waitForIndexAsync(videoId as string)

    const { armAccessToken, viAccessToken } = await authenticateAsync();
    const account = await getAccountAsync(armAccessToken);


    const params = new URLSearchParams({
        accessToken: viAccessToken,
        language: language,
        location: account.location,
        accountId: account.properties.accountId
    });

    const url = `${process.env.VIDEO_INDEXER_API_ENDPOINT as string}/${account.location}/Accounts/${account.properties.accountId}/Videos/${videoId}/Index?accessToken=${encodeURIComponent(viAccessToken)}&${params.toString()}`;

    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const index = await response.json();

    return index.videos[0];
}