import {BlobServiceClient} from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING as string);

export default blobServiceClient;