import blobServiceClient from "@/services/blobStorage/client";

import {IMAGE_CONTAINER_NAME} from "@/services/blobStorage/containers";

export const uploadImageAndGetUrl = async (image: Buffer): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(IMAGE_CONTAINER_NAME);
    await containerClient.createIfNotExists({access: 'blob'});
    const blockBlobClient = containerClient.getBlockBlobClient(`${Date.now()}.jpg`);
    await blockBlobClient.uploadData(image);
    return blockBlobClient.url;
}