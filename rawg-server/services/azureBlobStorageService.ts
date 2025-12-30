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

function parseAzureBlobUrl(
  blobUrl: string
): { container: string; blobName: string } | null {
  try {
    const u = new URL(blobUrl);
    const parts = u.pathname.split("/").filter(Boolean); // [container, ...blobNameParts]
    if (parts.length < 2) return null;
    const [container, ...blobParts] = parts;
    return { container, blobName: blobParts.join("/") };
  } catch {
    return null;
  }
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

export async function deleteBlobByUrl(blobUrl: string): Promise<boolean> {
  const parsed = parseAzureBlobUrl(blobUrl);
  if (!parsed) return false;

  const blobServiceClient = getBlobServiceClient();
  const containerClient = blobServiceClient.getContainerClient(
    parsed.container
  );
  const blobClient = containerClient.getBlobClient(parsed.blobName);

  const res = await blobClient.deleteIfExists({ deleteSnapshots: "include" });
  return res.succeeded;
}

async function deleteBlobsByPrefix(containerName: string, prefix: string) {
  const blobServiceClient = getBlobServiceClient();
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const toDelete: string[] = [];
  for await (const blob of containerClient.listBlobsFlat({ prefix })) {
    if (blob.name) toDelete.push(blob.name);
  }

  if (toDelete.length === 0) return 0;

  await Promise.all(
    toDelete.map((name) =>
      containerClient
        .getBlobClient(name)
        .deleteIfExists({ deleteSnapshots: "include" })
    )
  );

  return toDelete.length;
}

/**
 * Deletes all avatar blobs for a given user (best-effort).
 * NOTE: This assumes upload paths include the userId in the blob "folder".
 */
export async function deleteAllUserAvatars(
  userId: number | string
): Promise<number> {
  const containerName = process.env.AZURE_BLOB_CONTAINER_AVATARS ?? "avatars";

  // Must match the exact prefix used when uploading.
  // Current uploads use blobName like: `avatars/users/${userId}/...`
  const prefix = `avatars/users/${userId}/`;

  return deleteBlobsByPrefix(containerName, prefix);
}
