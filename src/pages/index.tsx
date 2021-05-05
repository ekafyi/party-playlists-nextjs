import { GetStaticProps, NextPage } from "next";
import * as React from "react";
import { CardInList, HomeHeader, MetaHead } from "../components";
import { APP_NAME } from "../lib/constants";
import { buildSlug } from "../lib/slug-helpers";
import { replaceUnicode } from "../lib/str-helpers";
import samplePlaylists from "../sample-data/playlists.json";

/** Playlist object with slug for single playlist route */
interface IPlaylistWithSlug extends SpotifyApi.PlaylistObjectSimplified {
  slug: string;
}

export const Home: NextPage<{ playlists?: IPlaylistWithSlug[] }> = ({ playlists }): JSX.Element => (
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

export const getStaticProps: GetStaticProps = async () => {
  // Use hardcoded sample data on dev.
  if (!process.env.URL && !process.env.CONTEXT) {
    const playlists = samplePlaylists.playlists.map((playlist) => ({
      ...playlist,
      slug: buildSlug(playlist),
      id: null,
    }));
    return { props: { playlists } };
  }

  const playlistIds = process.env.PLAYLIST_IDS?.split(",") || [];
  console.log("playlistIds ", playlistIds);

  // TODO fetch real data
  return { props: {} };
};

export default Home;
