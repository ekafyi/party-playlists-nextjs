import { AnimatePresence } from "framer-motion";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Card, Footer, GridContainer, MetaHead } from "../components";
import { APP_NAME, MINIMUM_FIELDS_PARAM } from "../lib/constants";
import { buildSlug } from "../lib/slug-helpers";
import { transformPlaylistData } from "../lib/transform-playlist-data";
import { assertFulfilled } from "../lib/type-helpers";
import samplePlaylists from "../sample-data/playlists.json";

/** Playlist object with slug for single playlist route */
interface IPlaylistWithSlug extends SpotifyApi.SinglePlaylistResponse {
  slug: string;
}

const EmptyView = () => (
  <>
    <MetaHead titleKey="homePage" title={APP_NAME} url={process.env.URL} />
    <GridContainer>
      <div className="flex h-80 items-center text-red-700">error getting playlists or no playlists found 😿</div>
    </GridContainer>
  </>
);

export const Home: NextPage<{ playlists?: IPlaylistWithSlug[] }> = ({ playlists }): JSX.Element => {
  const [selectedPlaylistSlug, setSelectedPlaylistSlug] = useState<string>();

  const router = useRouter();

  const findPlaylist = () => {
    const matched = playlists.find((item) => item.slug === selectedPlaylistSlug);
    return matched ? transformPlaylistData(matched) : null;
  };

  if (typeof playlists === "undefined" || !playlists.length) return <EmptyView />;

  return (
    <>
      <MetaHead titleKey="homePage" title={APP_NAME} url={process.env.URL} />
      {typeof selectedPlaylistSlug !== "undefined" ? (
        <main>
          <AnimatePresence>
            <Card isExpanded listData={findPlaylist()} />
          </AnimatePresence>
        </main>
      ) : (
        <GridContainer>
          <div className="relative mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {playlists.map((playlist) => (
              <Card
                key={playlist.slug}
                listData={transformPlaylistData(playlist)}
                onNavigate={(e) => {
                  e.preventDefault();
                  setSelectedPlaylistSlug(playlist.slug);
                  setTimeout(() => {
                    router.push(playlist.slug);
                  }, 400);
                }}
              />
            ))}
          </div>
        </GridContainer>
      )}
      <Footer />
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
