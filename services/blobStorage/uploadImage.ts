import blobServiceClient from "@/services/blobStorage/client";

import {IMAGE_CONTAINER_NAME} from "@/services/blobStorage/containers";

export const uploadImageAndGetUrl = async (image: Buffer): Promise<string> => {
    // Get a container client
    const containerClient = blobServiceClient.getContainerClient(IMAGE_CONTAINER_NAME);

    // Create the container if it does not exist
    await containerClient.createIfNotExists({
        access: 'blob'
    });

    const blockBlobClient = containerClient.getBlockBlobClient(`${Date.now()}.jpg`);

    const uploadBlobResponse = await blockBlobClient.uploadData(image);
    console.log(`Upload block blob response: ${uploadBlobResponse.requestId}`);

    const blobUrl = blockBlobClient.url;
    console.log(`Blob URL: ${blobUrl}`);

    return blobUrl;
}