import React from "react";
import useWindowDimensions from '../hooks/useWindowDimensions';
const VidBanner = ({ src}) => {
  const { height, width } = useWindowDimensions();
  return (
    <div className="vid-banner">
      <iframe title="vid-banner" src={src} width={width} height={height-66} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
};

export default VidBanner;
