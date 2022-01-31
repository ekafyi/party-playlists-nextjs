import * as React from "react";

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="flex flex-col justify-between gap-4 p-4 text-center text-xs text-gray-800 sm:flex-row">
      <div>Made with ♡ and occasional desperation in 🇮🇩</div>
      <div>
        <a
          className="font-bold underline hover:text-blue-600"
          href="https://github.com/ekafyi/party-playlists-nextjs"
          rel="external"
        >
          github.com/ekafyi
        </a>
      </div>
    </footer>
  );
};

export default Footer;
