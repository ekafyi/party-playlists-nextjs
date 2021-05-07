import { TRANSPARENT_PX_IMG } from "./constants";

// type NonEmptyArray<T> = [T, ...T[]];

export const getMediumImage = (images: SpotifyApi.ImageObject[]): SpotifyApi.ImageObject => {
  if (!images.length) return { url: TRANSPARENT_PX_IMG };
  if (images.length === 1) return images[0];
  return images[1];
};

export const getSmallestImage = (images: SpotifyApi.ImageObject[]): SpotifyApi.ImageObject => {
  if (!images.length) return { url: TRANSPARENT_PX_IMG };
  if (images.length === 1) return images[0];
  return images[images.length - 1];
};

export const getLargestImage = (images: SpotifyApi.ImageObject[]): SpotifyApi.ImageObject => {
  if (!images.length) return { url: TRANSPARENT_PX_IMG };
  return images[0];
};

export const buildSrcSet = (images: SpotifyApi.ImageObject[]): string | undefined => {
  if (images.length === 1 && !images[0].width) return undefined;
  const FALLBACK_WIDTH = 300;
  return images.map((img) => `${img.url} ${img.width || FALLBACK_WIDTH}w`).join(", ");
};
