import blobServiceClient from "@/services/blobStorage/client";

import {PDF_CONTAINER_NAME} from "@/services/blobStorage/containers";

export const uploadPDFAndGetUrl = async (video: Buffer): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(PDF_CONTAINER_NAME);
    await containerClient.createIfNotExists({access: 'blob'});
    const blockBlobClient = containerClient.getBlockBlobClient(`${Date.now()}.pdf`);
    await blockBlobClient.uploadData(video);
    return blockBlobClient.url;
}