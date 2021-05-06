export const APP_NAME = "The Party Corgi Listening Party";
export const APP_DESCRIPTION = "Collaborative playlists from the #listening-party channel in the Party Corgi Discord";
export const OG_IMG_FILENAME = "icon-512x512.png";

// From png-pixel.com
export const TRANSPARENT_PX_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrAcAAXcA+tGTVsYAAAAASUVORK5CYII=";

// Options for Spotify API playlist requests
export const MINIMUM_FIELDS_PARAM = `description,images,name,id`;
export const COMPLETE_FIELDS_PARAM = `description,images,name,tracks.items(added_by,track(id,name,artists(name),album(name,images)))`;

export const HOME_THUMB_SIZES = `(min-width: 576px) 16rem,
              (min-width: 768px) calc(33vw - 1.5rem),
              (min-width: 1024px) calc(25vw - 2rem),
              (min-width: 1140px) 14.375rem,
              calc(50vw - 2rem)`;
