import noImagePlaceholder from "../assets/no-image-placeholder-6f3882e0.webp";

const getCroppedImageUrl = (url: string | null) => {
  if (!url) return noImagePlaceholder;
  return url.replace("/media/", "/media/crop/600/400/");
};

export default getCroppedImageUrl;
