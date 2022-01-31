import fs from "fs";
import path from "path";
import { AnimatePresence } from "framer-motion";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Card, Footer, GridContainer, MetaHead } from "../components";
import { APP_NAME, MINIMUM_FIELDS_PARAM } from "../lib/constants";
import { buildSlug } from "../lib/slug-helpers";
import { transformFsToSpotifyPlaylistData } from "../lib/transforms";
import { assertFulfilled } from "../lib/type-helpers";
import { printWarningParseError, ZFsPlaylist } from "../lib/zod";

const EmptyView = () => (
  <>
    <MetaHead titleKey="homePage" title={APP_NAME} url={process.env.URL} />
    <GridContainer>
      <div className="flex h-80 items-center text-red-700">error getting playlists or no playlists found 😿</div>
    </GridContainer>
  </>
);

export const Home: NextPage<{ playlists?: IPlaylistExcerpt[] }> = ({ playlists }): JSX.Element => {
  const [selectedPlaylistSlug, setSelectedPlaylistSlug] = useState<string>();
  const [isTransitionComplete, setTransitionComplete] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isTransitionComplete) router.push(selectedPlaylistSlug);
  }, [isTransitionComplete, router, selectedPlaylistSlug]);

  const findPlaylist = () => {
    const matched = playlists.find((item) => item.slug === selectedPlaylistSlug);
    return matched || null;
  };

  const handleTransitionComplete = () => {
    setTransitionComplete(true);
  };

  if (typeof playlists === "undefined" || !playlists.length) return <EmptyView />;

  return (
    <>
      <MetaHead titleKey="homePage" title={APP_NAME} url={process.env.URL} />
      <AnimatePresence>
        {typeof selectedPlaylistSlug !== "undefined" ? (
          <main>
            <Card isExpanded onTransitionComplete={handleTransitionComplete} listData={findPlaylist()} />
          </main>
        ) : (
          <GridContainer>
            <div className="relative mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {playlists.map((playlist) => (
                <Card
                  key={playlist.slug}
                  listData={playlist}
                  onNavigate={(e) => {
                    e.preventDefault();
                    setSelectedPlaylistSlug(playlist.slug);
                  }}
                />
              ))}
            </div>
          </GridContainer>
        )}
      </AnimatePresence>
      <Footer />
      {/* {JSON.stringify(playlists)} */}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let fsPlaylists = [];
  let spotifyPlaylists = [];

  if (process.env.FS_PLAYLIST_DIRECTORY?.length) {
    const dataDir = path.join(process.cwd(), process.env.FS_PLAYLIST_DIRECTORY);
    const filenames = fs.readdirSync(dataDir)?.filter((filename) => filename.endsWith(".json"));

    fsPlaylists = filenames
      .map((filename) => {
        const filePath = path.join(dataDir, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const parsed = ZFsPlaylist.safeParse(JSON.parse(fileContents || "{}"));

        if (parsed.success) {
          return transformFsToSpotifyPlaylistData(filename, parsed.data);
        } else {
          printWarningParseError(filename);
          return null;
        }
      })
      .filter((item) => item);
  }

  if (process.env.SPOTIFY_PLAYLIST_IDS?.length) {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    await spotifyApi
      .clientCredentialsGrant()
      .then((data) => {
        // console.log("🔒 access token" + data.body["access_token"]);
        spotifyApi.setAccessToken(data.body["access_token"]);

        // Build an array of playlist requests
        const playlistIds = process.env.SPOTIFY_PLAYLIST_IDS.split(",") || [];
        const promises = playlistIds.map((playlistId) =>
          spotifyApi.getPlaylist(playlistId, { fields: MINIMUM_FIELDS_PARAM })
        );
        return Promise.allSettled(promises);
      })
      .then((res) => {
        spotifyPlaylists = res
          .filter(assertFulfilled)
          .map((res) => res.value.body)
          .map((playlist) => ({ ...playlist, slug: buildSlug(playlist), id: null }));
      })
      .catch((err) => {
        console.log("😾😾");
        console.error(err.response || err.code || err);
      });
  }

  const playlists = [...fsPlaylists, ...spotifyPlaylists];
  return { props: { playlists } };
};

export default Home;
