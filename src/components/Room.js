import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../images/house-1.jpg';
import PropTypes from 'prop-types';
import { memo } from 'react';

var formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const Room = memo(({ house }) => {
  const { slug, street, city, statecode, images, price, type } = house;
  // console.log(name);
    /*
    <div className="price-top">
      <h6>${price}</h6>
      <p>asking price</p>
    </div> */
  return (
    <article className="house">
      <div className="img-container">
        <img
          className="houseImg"
          src={images[0] || defaultImg}
          alt="single house"
        />
        <Link to={`/rooms/${slug}`} className="btn-primary house-link">
          details
        </Link>
      </div>
      <table className="house-info">
        <tbody>
          <tr>
            <td className="house-info-left">{street}</td>
            <td className="house-info-right">{formatter.format(price)}</td>
          </tr>
          <tr>
            <td className="house-info-left">{city + ", " + statecode}</td>
            <td className="house-info-right">{type}</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
});

Room.propTypes = {
  house: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};
export default Room;
