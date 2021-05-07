import { buildSrcSet } from "./../../src/lib/get-spotify-image";

// prettier-ignore
const ONE_IMAGE = [
  {
    height: null,
    url: "https://i.scdn.co/image/aaaa",
    width: null,
  },
];

// prettier-ignore
const THREE_IMAGES = [
  {
    height: 640,
    url: "https://mosaic.scdn.co/640/bbbb",
    width: 640,
  },
  {
    height: 300,
    url: "https://mosaic.scdn.co/300/bbbb",
    width: 300,
  },
  {
    height: 60,
    url: "https://mosaic.scdn.co/60/bbbb",
    width: 60,
  },
];

describe("build image srcset string", () => {
  test("three images", () => {
    expect(buildSrcSet(THREE_IMAGES)).toBe(
      "https://mosaic.scdn.co/640/bbbb 640w, https://mosaic.scdn.co/300/bbbb 300w, https://mosaic.scdn.co/60/bbbb 60w"
    );
  });
  test("one image", () => {
    expect(buildSrcSet(ONE_IMAGE)).toBe(undefined);
  });
});
