type ExcerptFields = "name" | "description" | "images";

type FullFields = "album" | "artists" | "name";

interface IPlaylistExcerpt extends Pick<SpotifyApi.SinglePlaylistResponse, ExcerptFields> {
  slug: string;
}

type SpotifyItem = {
  id: string;
  url?: never;
};

type CustomItem = {
  id?: never;
  url: string;
};

type SpotifyOrCustomItem = SpotifyItem | CustomItem;

// SpotifyApi.PlaylistTrackObject
interface SimplePlaylistTrackObject {
  added_by: Pick<SpotifyApi.UserObjectPublic, "display_name"> & SpotifyOrCustomItem;
  track: SomeRequiredElsePartial<SpotifyApi.TrackObjectFull, FullFields> & SpotifyOrCustomItem;
}

// interface SimpleTrackObject extends SomeRequiredElsePartial<SpotifyApi.TrackObjectFull, FullFields> {
//   url?: string;
// }

// SpotifyApi.PlaylistObjectFull
interface IPlaylistFull extends IPlaylistExcerpt {
  tracks: SpotifyApi.PagingObject<SimplePlaylistTrackObject>;
}
