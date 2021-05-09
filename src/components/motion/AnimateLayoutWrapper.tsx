import { m as motion, useReducedMotion } from "framer-motion";

interface IMotionWrapper {
  layoutId: string;
  className?: string;
}

// Use as outer wrapper of the CardInList component with "card-*" layoutId.
// Note: If using this, replace the direct child with motion component with layout="position" so it's not squished during transition.
// eg. <motion.article layout="position" className="..">
export const CardWrapper: React.FunctionComponent<IMotionWrapper> = ({ children, layoutId, ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div layoutId={shouldReduceMotion ? undefined : layoutId} layout {...props}>
      {children || ""}
    </motion.div>
  );
};

// Use as outer wrapper of the SinglePlaylist component with "card-*" layoutId.
export const PlaylistWrapper: React.FunctionComponent<IMotionWrapper> = ({ children, layoutId, ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  // the "initial" and "animate" props are for children motion components (ie. fade title & tracks in onMount), not for the layout animation.
  return (
    <motion.div layoutId={shouldReduceMotion ? undefined : layoutId} initial="initial" animate="animate" {...props}>
      {children || ""}
    </motion.div>
  );
};

// Use as thumbnail image wrapper in both CardInList and SinglePlaylist components with "thumb-*" layoutId.
// This can be used either as an extra wrapper outside div.card__artwork / div.playlist__artwork _or_ replacing
// those elements. If the latter, make sure to add the respective className.
export const ThumbWrapper = CardWrapper;
