export const replaceUnicode = (txt = ""): string => txt.replace("&#x27;", "’");

export const getTrackCountText = (count: number) => {
  return `${count} ${count > 1 ? "tracks" : "track"}`;
};
