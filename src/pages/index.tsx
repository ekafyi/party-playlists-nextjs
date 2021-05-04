import { GetStaticProps, NextPage } from "next";
import * as React from "react";
import { HomeHeader, MetaHead } from "../components";
import { APP_NAME } from "../lib/constants";
import { buildSlug } from "../lib/slug-helpers";
import samplePlaylists from "../sample-data/playlists.json";

/** Playlist object with slug for single playlist route */
interface IPlaylistWithSlug extends SpotifyApi.PlaylistObjectSimplified {
  slug: string;
}

export const Home: NextPage<{ playlists?: IPlaylistWithSlug[] }> = ({ playlists }): JSX.Element => (
  <div className="container">
    <MetaHead titleKey="homePage" title={APP_NAME} url={process.env.URL} />
    <HomeHeader />
    {playlists ? <div>{JSON.stringify(playlists)}</div> : <div>no playlists found</div>}
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  // Use hardcoded sample data on dev to save time and requests.
  if (!process.env.URL && !process.env.CONTEXT) {
    const playlists = samplePlaylists.playlists.map((playlist) => ({
      ...playlist,
      slug: buildSlug(playlist),
      id: null,
    }));
    return { props: { playlists } };
  }

  // TODO fetch real data
};

export default Home;
