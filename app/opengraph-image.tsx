import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/seo";

export const alt = site.tagline;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage(site.tagline);
}
