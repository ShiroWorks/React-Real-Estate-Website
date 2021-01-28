import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import VidBanner from '../components/VidBanner';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const home = () => {
  return (
    <>
      <Hero>
        <VidBanner src="https://www.youtube.com/embed/RItGenXuslY?start=8&autoplay=1&controls=0&loop=1">
        </VidBanner>
      </Hero>
      <FeaturedRooms />
    </>
  );
};
      /*<Services />
        <Link to="/rooms" className="btn-primary">
            our houses
        </Link>*/
export default home;
