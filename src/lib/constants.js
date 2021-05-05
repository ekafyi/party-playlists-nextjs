export const APP_NAME = "The Party Corgi Listening Party";
export const APP_DESCRIPTION = "Collaborative playlists from the #listening-party channel in the Party Corgi Discord";
export const OG_IMG_FILENAME = "icon-512x512.png";

// From png-pixel.com
export const TRANSPARENT_PX_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrAcAAXcA+tGTVsYAAAAASUVORK5CYII=";

// Options for Spotify API playlist requests
export const MINIMUM_FIELDS_PARAM = `description,images,name,id`;
export const COMPLETE_FIELDS_PARAM = `description,images,name,tracks.items(added_by,track(id,name,artists(name),album(name,images)))`;
