import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import { BackLink, MetaHead, SinglePlaylist } from "../components";
import { APP_NAME } from "../lib/constants";
import { getPlaylistIdBySlug } from "../lib/slug-helpers";
import samplePlaylist from "../sample-data/single-playlist.json";

const PlaylistPage: NextPage<{ playlist: SpotifyApi.PlaylistObjectFull }> = ({ playlist }) => {
  return (
    <>
      <MetaHead titleKey="slugPage" title={`${playlist.name} | ${APP_NAME}`} url={process.env.URL} />
      <BackLink />
      <SinglePlaylist playlist={playlist} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Return 404 if no/incorrect parameters or no playlist IDs.
  if (!params || typeof params.slug !== "string" || !process.env.PLAYLIST_IDS) return { notFound: true };

  // Use hardcoded sample data on dev.
  if (process.env.DEV_USE_SAMPLE_DATA) {
    const playlist = samplePlaylist;
    return { props: { playlist } };
  }

  const { slug } = params;

  const playlistId = getPlaylistIdBySlug(slug, process.env.PLAYLIST_IDS);

  if (!playlistId) return { notFound: true };

  // TODO fetch real data
};

export default PlaylistPage;
