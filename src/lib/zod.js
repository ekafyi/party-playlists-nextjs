import { z } from "zod";

export const ZImage = z.object({
  height: z.number().optional(),
  width: z.number().optional(),
  url: z.string(),
});

export const ZFsTrack = z.object({
  added_by: z.object({
    display_name: z.string(),
    url: z.string().optional(),
  }),
  artist_name: z.string(),
  name: z.string(),
  images: z.array(ZImage).optional(),
  url: z.string(),
});

export const ZFsPlaylist = z.object({
  description: z.string().optional(),
  images: z.array(ZImage).optional(),
  name: z.string(),
  tracks: z.array(ZFsTrack),
});

export const printWarningParseError = (filename = "") => {
  console.warn(`⛔️ Warning: ${filename} could not be parsed. Make sure the file content is in the correct format.`);
};
