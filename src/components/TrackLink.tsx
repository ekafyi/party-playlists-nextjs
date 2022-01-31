type TrackLinkProps = SpotifyOrCustomItem;

const TrackLink = ({ id = "", url = "" }: TrackLinkProps) => {
  const trackUrl = id ? `https://open.spotify.com/track/${id}` : url;
  return (
    <a
      target="_blank"
      rel="external noopener noreferrer"
      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-2xl bg-white text-gray-500 hover:text-green-700 focus:text-green-700 focus:outline-none focus:ring"
      href={trackUrl}
      aria-label="open track in Spotify"
      title="open track in Spotify"
    >
      <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" focusable="false">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6" />
          <path d="M10 14L21 3" />
        </g>
      </svg>
    </a>
  );
};

export default TrackLink;
