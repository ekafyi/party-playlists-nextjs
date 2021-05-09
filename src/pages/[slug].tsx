import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { BackLink, MetaHead, SinglePlaylist } from "../components";
import { APP_NAME, COMPLETE_FIELDS_PARAM } from "../lib/constants";
import { getPlaylistIdBySlug } from "../lib/slug-helpers";
import samplePlaylist from "../sample-data/single-playlist.json";

const PlaylistPage: NextPage<{ playlist: SpotifyApi.PlaylistObjectFull }> = ({ playlist }) => {
  return (
    <>
      <MetaHead titleKey="slugPage" title={`${playlist.name} | ${APP_NAME}`} url={process.env.URL} />
      <BackLink />
      <motion.div layoutId={`card-${playlist.name}`}>
        <SinglePlaylist playlist={playlist} />
      </motion.div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Return 404 if no/incorrect parameters or no playlist IDs.
  if (!params || typeof params.slug !== "string" || !process.env.PLAYLIST_IDS) return { notFound: true };

  // Use hardcoded sample data on dev.
  if (process.env.DEV_USE_SAMPLE_DATA) return { props: { playlist: samplePlaylist } };

  const { slug } = params;
  const playlistId = getPlaylistIdBySlug(slug, process.env.PLAYLIST_IDS);

  // Return 404 if playlist id is not in the list.
  if (!playlistId) return { notFound: true };

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  return spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      // console.log("🔒 access token" + data.body["access_token"]);
      spotifyApi.setAccessToken(data.body["access_token"]);

      return spotifyApi.getPlaylist(playlistId, { fields: COMPLETE_FIELDS_PARAM });
    })
    .then((res) => {
      const playlist = res.body;
      // console.log("💽💽💽", playlist);
      return { props: { playlist } };
    })
    .catch((err) => {
      console.log("😾😾");
      console.error(err.response || err.code || err);
      return { props: {} };
    });
};

export default PlaylistPage;
