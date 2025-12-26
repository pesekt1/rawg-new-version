import getCroppedImageUrl from "./image-url";
import noImagePlaceholder from "../assets/no-image-placeholder-6f3882e0.webp";
import { describe, it, expect } from "vitest";

describe("getCroppedImageUrl", () => {
  it("returns placeholder if url is null", () => {
    expect(getCroppedImageUrl(null)).toBe(noImagePlaceholder);
  });

  it("returns placeholder if url is undefined", () => {
    expect(getCroppedImageUrl(undefined)).toBe(noImagePlaceholder);
  });

  it("returns placeholder if url is empty string", () => {
    expect(getCroppedImageUrl("")).toBe(noImagePlaceholder);
  });

  it("replaces /media/ with /media/crop/600/400/ in the url", () => {
    const url = "https://example.com/media/image.jpg";
    expect(getCroppedImageUrl(url)).toBe(
      "https://example.com/media/crop/600/400/image.jpg"
    );
  });

  it("does not modify url if /media/ is not present", () => {
    const url = "https://example.com/images/image.jpg";
    expect(getCroppedImageUrl(url)).toBe(
      "https://example.com/images/image.jpg"
    );
  });
});
