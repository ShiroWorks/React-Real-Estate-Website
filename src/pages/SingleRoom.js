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
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = RoomContext;

  // componentDidMount() {
  //   console.log(this.props);
  // }
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
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${city}, ${statecode}`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-house">
          <div className="single-house-images">
            {defaultImages.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className="single-house-info">
            <article className="desc">
              <h3>address</h3>
              <p>{street}</p>
              <p>{city}, {statecode} {zipcode}</p>
              <a href={`${url}`}>See on Zillow</a>
            </article>
            <article className="info">
              <h3>info</h3>
              <p>Price: {price !== undefined ? `$${price}` : `Not Listed`}</p>
              <p>Size: {size !== -1 ? `${size} sqft` : `Not listed`}</p>
              <p>Bedrooms: {bedrooms !== undefined ? bedrooms : ` N/A`}</p>
              <p>Bathrooms: {bathrooms !== undefined ? bathrooms : ` N/A`}</p>
              <p>Broker: {broker !== undefined ? broker : `Not Listed`}</p>
            </article>
          </div>
          <div>
            <FeaturedButton zpid={id}/>
          </div>
        </section>
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
