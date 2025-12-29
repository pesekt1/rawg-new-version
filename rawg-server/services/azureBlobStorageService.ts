import { BlobServiceClient } from "@azure/storage-blob";

type UploadAvatarInput = {
  blobName: string;
  buffer: Buffer;
  contentType: string;
};

function getBlobServiceClient() {
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!conn) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
  }
  return BlobServiceClient.fromConnectionString(conn);
}

export async function uploadAvatarToAzure(
  input: UploadAvatarInput
): Promise<string> {
  const containerName = process.env.AZURE_BLOB_CONTAINER_AVATARS ?? "avatars";
  const blobServiceClient = getBlobServiceClient();

  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    // Requires storage account/container to allow public access; otherwise serve via SAS/CDN.
    access: "blob",
  });

  const blockBlobClient = containerClient.getBlockBlobClient(input.blobName);
  await blockBlobClient.uploadData(input.buffer, {
    blobHTTPHeaders: { blobContentType: input.contentType },
  });

  return blockBlobClient.url;
}
