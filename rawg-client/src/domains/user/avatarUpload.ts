import { apiPost } from "../../services/api-client";

export const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export function validateAvatarFile(
  file: File,
  maxBytes: number = MAX_AVATAR_BYTES
) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Avatar must be an image file");
  }
  if (file.size > maxBytes) {
    throw new Error(`Avatar too large (max ${maxBytes} bytes)`);
  }
}

export async function uploadMyAvatar(
  file: File
): Promise<{ avatarUrl: string }> {
  validateAvatarFile(file);

  const form = new FormData();
  form.append("file", file);

  // Uses axiosInstance baseURL + Authorization interceptor (project standard)
  return apiPost<{ avatarUrl: string }, FormData>("/users/me/avatar", form);
}
