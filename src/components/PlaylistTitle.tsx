import { m as motion } from "framer-motion";

interface PlaylistTitleProps {
  content: string;
  placement: "LIST" | "SINGLE";
}

const PlaylistTitle = ({ content, placement }: PlaylistTitleProps) => {
  return (
    <>
      {placement === "LIST" ? (
        <motion.h2 className="truncate text-base font-bold" layout>
          {content}
        </motion.h2>
      ) : (
        <motion.h1
          data-area="title"
          className="pt-1 text-2xl font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          layout
        >
          {content}
        </motion.h1>
      )}
    </>
  );
};

export default PlaylistTitle;
