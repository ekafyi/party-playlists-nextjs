export const transformFsToSpotifyPlaylistData = (filename, parsedData) => {
  const { description, images, name, tracks } = parsedData;
  const spotifyTrackItems = tracks.map((item) => {
    return {
      added_by: item.added_by,
      track: {
        album: { images: item.images },
        artists: [{ name: item.artist_name }],
        id: null,
        name: item.name,
        url: item.url,
      },
    };
  });
  return {
    description,
    images,
    name,
    slug: filename.replace(".json", ""),
    tracks: { items: spotifyTrackItems },
  };
};
