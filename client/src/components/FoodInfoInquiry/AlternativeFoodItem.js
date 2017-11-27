import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const AlternativeFoodItem = ({ food: { id, imageUrl, alternativeReason } }) => (
  <div className='food-slider__food'>
    <Link to={{ pathname: "/product/id/" + id }}>
      <Image responsive src={imageUrl} alt={id}></Image>
    </Link>
    <div className="food-slider__info" dangerouslySetInnerHTML={{__html: alternativeReason}}></div>
  </div>
);

AlternativeFoodItem.propTypes = {
  food: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    imageUrl: PropTypes.string.isRequired,
    alternativeReason: PropTypes.string.isRequired
  })
}

export default AlternativeFoodItem;