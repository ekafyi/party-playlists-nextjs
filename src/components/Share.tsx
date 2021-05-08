import { RWebShare } from "react-web-share";

const Share: React.FunctionComponent<{ title: string }> = ({ title }) => {
  return (
    <>
      <RWebShare
        data={{
          text: `Check out this playlist: ${title}`,
          url: typeof window !== "undefined" ? window.location.href : process.env.URL,
          title: title,
        }}
      >
        <button className="text-sm font-medium px-4 py-1 rounded bg-gray-50 text-gray-700 hover:text-black">
          Share
        </button>
      </RWebShare>
      <style jsx global>{`
        .web-share-fade header {
          font-size: 1.125rem !important;
          line-height: 1.25;
        }
      `}</style>
    </>
  );
};

export default Share;
