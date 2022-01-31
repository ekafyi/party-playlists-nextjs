import fs from "fs";
import path from "path";
import { GetServerSideProps, NextPage } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { BackLink, Card, Footer, MetaHead } from "../components";
import { APP_NAME, COMPLETE_FIELDS_PARAM } from "../lib/constants";
import { getPlaylistIdBySlug } from "../lib/slug-helpers";
import { transformFsToSpotifyPlaylistData } from "../lib/transforms";
import { printWarningParseError, ZFsPlaylist } from "../lib/zod";

const PlaylistPage: NextPage<{ playlist: IPlaylistFull }> = ({ playlist }) => {
  return (
    <>
      <MetaHead titleKey="slugPage" title={`${playlist.name} | ${APP_NAME}`} url={process.env.URL} />
      <BackLink />
      <main>
        <Card isExpanded listData={playlist} tracksData={playlist.tracks.items} />
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Return 404 if no/incorrect parameters
  if (!params || typeof params.slug !== "string") return { notFound: true };

  const { slug } = params;

  if (process.env.FS_PLAYLIST_DIRECTORY?.length) {
    const dataDir = path.join(process.cwd(), process.env.FS_PLAYLIST_DIRECTORY);
    try {
      const filePath = path.join(dataDir, `${slug}.json`);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const parsed = ZFsPlaylist.safeParse(JSON.parse(fileContents || "{}"));

      if (parsed.success) {
        return { props: { playlist: transformFsToSpotifyPlaylistData(`${slug}.json`, parsed.data) } };
      } else {
        printWarningParseError(`${slug}.json`);
        return { notFound: true };
      }
    } catch (error) {
      console.warn("⚠️ File not found or invalid, trying Spotify API now");
      console.warn(error.message);
    }
  }

  const playlistId = getPlaylistIdBySlug(slug, process.env.SPOTIFY_PLAYLIST_IDS);

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
