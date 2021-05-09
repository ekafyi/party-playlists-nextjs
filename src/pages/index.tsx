import { GetStaticProps, NextPage } from "next";
import * as React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { CardInList, HomeHeader, MetaHead } from "../components";
import { APP_NAME, MINIMUM_FIELDS_PARAM } from "../lib/constants";
import { buildSlug } from "../lib/slug-helpers";
import { replaceUnicode } from "../lib/str-helpers";
import { assertFulfilled } from "../lib/type-helpers";
import samplePlaylists from "../sample-data/playlists.json";

/** Playlist object with slug for single playlist route */
interface IPlaylistWithSlug extends SpotifyApi.SinglePlaylistResponse {
  slug: string;
}

export const Home: NextPage<{ playlists?: IPlaylistWithSlug[] }> = ({ playlists }): JSX.Element => {
  return (
    <>
      <MetaHead titleKey="homePage" title={APP_NAME} url={process.env.URL} />
      <main className="flex flex-col items-center justify-center max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto p-2 md:p-4">
        <HomeHeader />
        {playlists ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 mb-8">
            {playlists.map((playlist) => (
              <CardInList
                key={playlist.name}
                title={playlist.name}
                subtitle={replaceUnicode(playlist.description || "")}
                slug={`/${playlist.slug}`}
                images={playlist.images}
              />
            ))}
          </div>
        ) : (
          <div className="text-red-700 h-80 flex items-center">error getting playlists 😿</div>
        )}
      </main>
      {/* {JSON.stringify(playlists)} */}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Don't proceed if no playlist ids.
  if (!process.env.PLAYLIST_IDS || !process.env.PLAYLIST_IDS.length) return { props: {} };

  if (process.env.DEV_USE_SAMPLE_DATA) {
    const playlists = samplePlaylists.playlists.map((playlist) => ({
      ...playlist,
      slug: buildSlug(playlist),
      id: null,
    }));
    return { props: { playlists } };
  }

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  return spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      // console.log("🔒 access token" + data.body["access_token"]);
      spotifyApi.setAccessToken(data.body["access_token"]);

      // Build an array of playlist requests
      const playlistIds = process.env.PLAYLIST_IDS.split(",") || [];
      const promises = playlistIds.map((playlistId) =>
        spotifyApi.getPlaylist(playlistId, { fields: MINIMUM_FIELDS_PARAM })
      );
      return Promise.allSettled(promises);
    })
    .then((res) => {
      const playlists = res
        .filter(assertFulfilled)
        .map((res) => res.value.body)
        .map((playlist) => ({ ...playlist, slug: buildSlug(playlist), id: null }));

      return { props: { playlists } };
    })
    .catch((err) => {
      console.log("😾😾");
      console.error(err.response || err.code || err);
      return { props: {} };
    });
};

export default Home;
