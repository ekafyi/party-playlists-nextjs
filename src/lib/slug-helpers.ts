import slugify from "slugify";

/** Playlist object with only required "id" and "name" for generating slug */
type PlaylistForBuildSlug = Pick<SpotifyApi.PlaylistBaseObject, "id" | "name">;

export const buildSlug = (playlist: PlaylistForBuildSlug): string =>
  `${slugify(playlist.name, { lower: true, strict: true })}-${playlist.id.substr(0, 4)}`;
