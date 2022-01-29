import { replaceUnicode } from "./str-helpers";

interface IPlaylistWithOptionalSlug extends SpotifyApi.SinglePlaylistResponse {
  slug?: string;
}

export const transformPlaylistData = (playlist: IPlaylistWithOptionalSlug) => ({
  title: playlist.name,
  description: replaceUnicode(playlist.description),
  slug: playlist.slug || "",
  images: playlist.images,
});
