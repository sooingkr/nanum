import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const AlternativeFoodItem = ({ food: { globalId, imageUrl, alternativeReason } }) => (
  <div className='food-slider__food'>
    <Link to={`/foods/${globalId}`}>
      <Image responsive src={imageUrl} alt={globalId}></Image>
    </Link>
    <div className="food-slider__info" dangerouslySetInnerHTML={{__html: alternativeReason}}></div>
  </div>
);

AlternativeFoodItem.propTypes = {
  food: PropTypes.shape({
    globalId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    imageUrl: PropTypes.string.isRequired,
    alternativeReason: PropTypes.string.isRequired
  })
}

export default AlternativeFoodItem;