# Listening Party

Source code for the web app showcasing Spotify collaborative playlists from the [Party Corgi Discord](https://www.partycorgi.com/) `#listening-party` channel.

Built with:
- [Next.js](https://nextjs.org/)
- [Netlify](https://www.netlify.com/) with [Next.js build plugin](https://github.com/netlify/netlify-plugin-nextjs)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Workbox](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) via [next-pwa](https://github.com/shadowwalker/next-pwa)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) via [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)
- ...and more

Lighthouse: https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Flistening-party.netlify.app%2F


## Usage

I made this for my own use, but feel free to fork/clone as a starter and make it your own.

Make an `.env.local` file in your project root, which will be [loaded ](https://nextjs.org/docs/basic-features/environment-variables) by Next.js.

```bash
# Your Spotify developer app credentials
# See: https://developer.spotify.com/documentation/general/guides/app-settings/
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=

# Comma separated IDs of the playlists you want to display
PLAYLIST_IDS=

# (Optional) Use local JSON file as data source
# DEV_USE_SAMPLE_DATA=1

# These are added by Netlify in their remote env config
# URL=https://listening-party.netlify.app
# CONTEXT=production
```

I use Netlify, which automatically adds the last two items in the config on their remote environment. I use `process.env.URL` in some parts of the code; search and modify as needed if you use a different service.

Lastly, make sure your remote environment configuration contains the same values. Refer to these docs if you use Netlify or Vercel:
- https://docs.netlify.com/configure-builds/environment-variables/
- https://vercel.com/docs/environment-variables

#### About the DEV_USE_SAMPLE_DATA config

During development, I use local JSON files as data source instead of fetching from the Spotify API, which is faster and reduces Spotify API hits. To use sample data, enable `DEV_USE_SAMPLE_DATA=1` in the environment configuration and (optionally) modify the data here https://github.com/ekafyi/party-playlists-nextjs/tree/docs/update-readme/src/sample-data.

⚠️ Important: Make sure you have obscured the playlist IDs before committing sample data from (eg.) fetch or cURL results.

Have fun and let me know what you build from this! 🤘🏽

---

Icon by [Freepik.com](https://www.freepik.com)
