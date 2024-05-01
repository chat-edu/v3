import blobServiceClient from "@/services/blobStorage/client";

import {VIDEO_CONTAINER_NAME} from "@/services/blobStorage/containers";

export const uploadVideoAndGetUrl = async (video: Buffer): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(VIDEO_CONTAINER_NAME);
    await containerClient.createIfNotExists({access: 'blob'});
    const blockBlobClient = containerClient.getBlockBlobClient(`${Date.now()}.mp4`);
    await blockBlobClient.uploadData(video);
    return blockBlobClient.url;
}