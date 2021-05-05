import slugify from "slugify";

/** Playlist object with only required "id" and "name" for generating slug */
type PlaylistForBuildSlug = Pick<SpotifyApi.PlaylistBaseObject, "id" | "name">;

/**
 * Construct path slug from a playlist's title and first 4 chars of playlist id.
 *
 * @param playlist Spotify playlist object
 * @returns string
 */
export const buildSlug = (playlist: PlaylistForBuildSlug): string | null => {
  if (!playlist.name || !playlist.id || playlist.id.length < 10) return null;
  return `${slugify(playlist.name, { lower: true, strict: true })}-${playlist.id.substr(0, 4)}`;
};

/**
 * Given a playlist path slug, find matching full playlist ID from env config.
 *
 * @param slug string - URL path from slugified title and first 4 chars of playlist id
 * @param strIds string - list of comma separated playlist ids from env config
 * @returns string | null
 */
export const getPlaylistIdBySlug = (slug: string, strIds: string): string | null => {
  const slugArr = slug.split("-");
  const needle = slugArr[slugArr.length - 1] || "";
  const haystack = strIds.split(",").filter((id) => id.substr(0, 4) === needle);
  if (haystack.length) return haystack[0];
  return null;
};
