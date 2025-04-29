import noImagePlaceholder from "../assets/no-image-placeholder-6f3882e0.webp";

/**
 * Returns a cropped image URL for display, or a placeholder if the URL is missing.
 * Replaces the "/media/" segment with "/media/crop/600/400/" for consistent image sizing.
 *
 * @param url - The original image URL or null.
 * @returns The cropped image URL or a placeholder image.
 */
const getCroppedImageUrl = (url: string | null) => {
  if (!url) return noImagePlaceholder;
  return url.replace("/media/", "/media/crop/600/400/");
};

export default getCroppedImageUrl;
