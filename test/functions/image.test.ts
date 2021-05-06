// eslint-disable-next-line @typescript-eslint/no-unused-vars

const IMAGES = [
  {
    height: 640,
    url:
      "https://mosaic.scdn.co/640/ab67616d0000b2730ef84b82816687fc634c4910ab67616d0000b2735ddbd61ea4a6dab213cc97afab67616d0000b273aaac5479cd9db05e896db80fab67616d0000b273f9fe3333babc806530a8545a",
    width: 640,
  },
  {
    height: 300,
    url:
      "https://mosaic.scdn.co/300/ab67616d0000b2730ef84b82816687fc634c4910ab67616d0000b2735ddbd61ea4a6dab213cc97afab67616d0000b273aaac5479cd9db05e896db80fab67616d0000b273f9fe3333babc806530a8545a",
    width: 300,
  },
  {
    height: 60,
    url:
      "https://mosaic.scdn.co/60/ab67616d0000b2730ef84b82816687fc634c4910ab67616d0000b2735ddbd61ea4a6dab213cc97afab67616d0000b273aaac5479cd9db05e896db80fab67616d0000b273f9fe3333babc806530a8545a",
    width: 60,
  },
];

const buildSrcset = (images) => {
  // ...
};

describe("build image srcset string", () => {
  test("ya", () => {
    expect(buildSrcset(IMAGES)).toBe("foooo");
  });
});
