import * as React from "react";

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="p-4 text-xs text-gray-800 flex justify-between">
      <div>Made with ♡ and occasional desperation in 🇮🇩</div>
      <div>
        <a
          className="underline font-bold hover:text-blue-600"
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
