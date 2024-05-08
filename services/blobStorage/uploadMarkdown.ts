import blobServiceClient from "@/services/blobStorage/client";

import {IMAGE_CONTAINER_NAME, MARKDOWN_CONTAINER_NAME} from "@/services/blobStorage/containers";

export const uploadMarkdownAndGetUrl = async (image: Buffer): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(MARKDOWN_CONTAINER_NAME);
    await containerClient.createIfNotExists({access: 'blob'});
    const blockBlobClient = containerClient.getBlockBlobClient(`${Date.now()}.MD`);
    await blockBlobClient.uploadData(image);
    return blockBlobClient.url;
}