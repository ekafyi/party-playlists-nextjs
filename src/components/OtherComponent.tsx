const OtherComponent: React.FunctionComponent<{ src: string }> = ({ src }) => {
  return <img src={src} className="common-full-image" loading="lazy" alt="" width="200" height="200" />;
};

export default OtherComponent;
