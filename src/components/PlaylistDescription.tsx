import { m as motion } from "framer-motion";

interface PlaylistDescriptionProps {
  content: string;
  singleOnlyContent?: string;
  placement: "LIST" | "SINGLE";
}

const PlaylistDescription = ({ content, placement, singleOnlyContent = "" }: PlaylistDescriptionProps) => {
  return (
    <>
      {placement === "LIST" ? (
        <motion.p className="text-xs text-gray-700 line-clamp-2" layout>
          {content}
        </motion.p>
      ) : (
        <>
          <motion.p className="text-sm text-gray-700" layout>
            {content}
          </motion.p>
          {singleOnlyContent && (
            <motion.p className="mt-2 text-xs text-gray-700" layout>
              {singleOnlyContent}
            </motion.p>
          )}
        </>
      )}
    </>
  );
};

export default PlaylistDescription;
