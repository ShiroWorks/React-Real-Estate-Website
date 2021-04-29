import React, { Component } from 'react';
import defaultBcg from '../images/house-1.jpg';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import FeaturedButton from '../components/FeaturedButton';

import StyledHero from '../components/StyledHero';
export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = RoomContext;

  render() {
    const { getRoom } = this.context;
    const house = getRoom(this.state.slug);

    if (!house) {
      return (
        <div className="error">
          <h3> no such house could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
      id, images, name, type, price, size, featured, bathrooms, bedrooms, city, statecode, street, zipcode, url, broker
    } = house;
    const [main, ...defaultImages] = images;

    return (
      <>
        <section className="single-house">
          <StyledHero img={images[0] || this.state.defaultBcg} className="single-house-image" />
          <div className="single-house-info">
            <Link to="/rooms" className="btn-back">
              <span>Back to rooms</span>
            </Link>
            <div className="desc">
              <h2>{street}</h2>
              <p>{city}, {statecode} {zipcode}</p>
            </div>
            <div className="info">
              <p>Price: <strong>{price !== undefined ? `$${price}` : `Not Listed`}</strong></p>
              <p>Size: <strong>{size !== -1 ? `${size} sqft` : `Not listed`}</strong></p>
              <p>Bedrooms: <strong>{bedrooms !== undefined ? bedrooms : ` N/A`}</strong></p>
              <p>Bathrooms: <strong>{bathrooms !== undefined ? bathrooms : ` N/A`}</strong></p>
              <p>Broker: <strong>{broker !== undefined ? broker : `Not Listed`}</strong></p>
              <a href={`${url}`} className="btn-primary">See on Zillow</a>
            </div>
          </div>
          <div>
            <FeaturedButton zpid={id}/>
          </div>
        </section>
        <div className="single-house-gallery">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
      </>
    );
              /*<h6>{garden ? 'with garden' : 'no garden'}</h6>
              <h6>{airconditioning && 'airconditioning included'}</h6>

              <section className="house-extras">
          <h6>extras </h6>
          <ul className="extras">
            {extras.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </section>*/
  }
}
