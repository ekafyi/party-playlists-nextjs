import { TRANSPARENT_PX_IMG } from "./constants";

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
