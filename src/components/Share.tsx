import dynamic from "next/dynamic";
// import { RWebShare } from "react-web-share";

const RWebShare = dynamic(() => import("react-web-share").then((rws) => rws.RWebShare), {
  ssr: false,
  loading: () => <ShareButton disabled="true" />,
});

const ShareButton = (props) => (
  <button className="text-sm font-medium px-4 py-1 rounded bg-gray-50 text-gray-700 hover:text-black" {...props}>
    Share
  </button>
);

const Share: React.FunctionComponent<{ title: string }> = ({ title }) => {
  const data = {
    text: `Check out this playlist: ${title}`,
    url: typeof window !== "undefined" ? window.location.href : process.env.URL,
    title: title,
  };
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <RWebShare data={data}>
        <ShareButton />
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
