import React from 'react';
import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';


const AlternativeFoodItem = ({ food: { imgSrc, foodName, foodInfo, foodId } }) => {

  return (
    <div className='food-slider__food'>
      <Link to={{ pathname: "/product/id/" + foodId }}>
        <Image responsive src={imgSrc} alt={foodName}></Image>
      </Link>
      <div className="food-slider__info">{foodInfo}</div>
    </div>
  )
}

AlternativeFoodItem.propTypes = {
  food: PropTypes.shape({
    foodId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    foodName: PropTypes.string.isRequired,
    foodInfo: PropTypes.string.isRequired
  })
}

export default AlternativeFoodItem;