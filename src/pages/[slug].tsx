import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import { MetaHead } from "../components";
import { APP_NAME } from "../lib/constants";
import { getPlaylistIdBySlug } from "../lib/slug-helpers";
import samplePlaylist from "../sample-data/single-playlist.json";

const PlaylistPage: NextPage<{ playlist: SpotifyApi.PlaylistObjectFull }> = ({ playlist }) => {
  return (
    <>
      <MetaHead titleKey="slugPage" title={`${playlist.name} | ${APP_NAME}`} url={process.env.URL} />
      <main>
        <h1>{playlist.name}</h1>
        <div>{JSON.stringify(playlist)}</div>
      </main>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Return 404 if no/incorrect parameters or no playlist IDs.
  if (!params || typeof params.slug !== "string" || !process.env.PLAYLIST_IDS) return { notFound: true };

  // Use hardcoded sample data on dev.
  if (!process.env.URL && !process.env.CONTEXT) {
    const playlist = samplePlaylist;
    return { props: { playlist } };
  }

  const { slug } = params;

  const playlistId = getPlaylistIdBySlug(slug, process.env.PLAYLIST_IDS);

  if (!playlistId) return { notFound: true };

  // TODO fetch real data
};

export default PlaylistPage;