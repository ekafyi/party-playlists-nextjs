import { buildSlug, getPlaylistIdBySlug } from "../../src/lib/slug-helpers";

const PLAYLIST_IDS = "1234xxxxxxxxxxxxxxxxxx,5678xxxxxxxxxxxxxxxxxx";

const PLAYLIST_VALUES = [
  { id: "1234xxxxxxxxxxxxxxxxxx", name: "Lorem Ipsum" },
  { id: "1234xxxxxxxxxxxxxxxxxx", name: "Lorem Ipsum! Dolor-Sit-Amet — April 2021" },
  { id: undefined, name: "Lorem Ipsum" },
  { id: "1234xxxxxxxxxxxxxxxxxx", name: undefined },
];

const SLUG_VALUES = [
  "lorem-1234",
  "lorem-ipsum-1234",
  "lorem-ipsum--dolor-13345435-1234",
  "lorem-6666",
  "lorem-1",
  "lorem",
];

describe("build slug from playlist ID and name", () => {
  test("with short name", () => {
    expect(buildSlug(PLAYLIST_VALUES[0])).toBe("lorem-ipsum-1234");
  });
  test("with special chars", () => {
    expect(buildSlug(PLAYLIST_VALUES[1])).toBe("lorem-ipsum-dolor-sit-amet-april-2021-1234");
  });
  test("with malformed data - missing id", () => {
    expect(buildSlug(PLAYLIST_VALUES[2])).toBe(null);
  });
  test("with malformed data - missing name", () => {
    expect(buildSlug(PLAYLIST_VALUES[3])).toBe(null);
  });
});

describe("get playlist ID by slug", () => {
  test("with short slug", () => {
    expect(getPlaylistIdBySlug(SLUG_VALUES[0], PLAYLIST_IDS)).toBe("1234xxxxxxxxxxxxxxxxxx");
  });
  test("with medium slug", () => {
    expect(getPlaylistIdBySlug(SLUG_VALUES[1], PLAYLIST_IDS)).toBe("1234xxxxxxxxxxxxxxxxxx");
  });
  test("with long slug", () => {
    expect(getPlaylistIdBySlug(SLUG_VALUES[2], PLAYLIST_IDS)).toBe("1234xxxxxxxxxxxxxxxxxx");
  });
  test("nonexistent playlist", () => {
    expect(getPlaylistIdBySlug(SLUG_VALUES[3], PLAYLIST_IDS)).toBe(null);
  });
  test("malformed slug 1", () => {
    expect(getPlaylistIdBySlug(SLUG_VALUES[4], PLAYLIST_IDS)).toBe(null);
  });
  test("malformed slug 2", () => {
    expect(getPlaylistIdBySlug(SLUG_VALUES[5], PLAYLIST_IDS)).toBe(null);
  });
});
