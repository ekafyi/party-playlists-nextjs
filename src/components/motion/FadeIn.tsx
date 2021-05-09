import { m as motion, Transition } from "framer-motion";

const BASE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  // exit: { opacity: 0 },
};

interface IFadeInProps {
  transition?: Transition;
  className?: string;
  element?: string;
}

export const FadeInParent: React.FunctionComponent = (props): JSX.Element => {
  // Child component (eg. FadeIn) can omit the framer-motion lifecycle props (initial etc) if wrapped in a parent that does.
  return (
    <motion.div initial="initial" animate="animate">
      {props.children || ""}
    </motion.div>
  );
};

// Use for non-layout motion components, either as a wrapper or replacing non-motion element.
// eg. <FadeIn element="header" transition={{ delay: 0.2 }} className="foo">
// Without motion: <header className="foo">
export const FadeIn: React.FunctionComponent<IFadeInProps> = (props): JSX.Element => {
  if (props.element) {
    switch (props.element) {
      case "header":
        return (
          <motion.header variants={BASE_VARIANTS} {...props}>
            {props.children || ""}
          </motion.header>
        );
      case "section":
        return (
          <motion.section variants={BASE_VARIANTS} {...props}>
            {props.children || ""}
          </motion.section>
        );
      default:
        return (
          <motion.div variants={BASE_VARIANTS} {...props}>
            {props.children || ""}
          </motion.div>
        );
    }
  }
  return (
    <motion.div variants={BASE_VARIANTS} {...props}>
      {props.children || ""}
    </motion.div>
  );
};
