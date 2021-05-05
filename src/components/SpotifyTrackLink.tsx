const SpotifyTrackLink: React.FunctionComponent<{ id: string }> = ({ id }) => (
  <>
    <a
      target="_blank"
      rel="external noopener noreferrer"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-gray-500 hover:text-green-700 focus:text-green-700 focus:ring focus:outline-none rounded-2xl"
      href={`https://open.spotify.com/track/${id}`}
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
  </>
);

export default SpotifyTrackLink;
