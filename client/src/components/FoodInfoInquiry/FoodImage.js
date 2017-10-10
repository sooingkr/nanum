import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

import { Image } from 'react-bootstrap';
import './FoodImage.scss';

class FoodImage extends Component {

  render() {
    const { index, image: { foodId, imgSrc, foodName, foodInfo } } = this.props;
    return (
      <div className="food-image__block" key={index}>
        <Link to={path = { "/product/id/" + foodId }}>
          <Image responsive src={imgSrc} alt={foodName}></Image>
          <span className="food-image__name">{foodName}</span>
          <span className="food-image__info">{foodInfo}</span>
          <span className="food-image__arrow "></span>
        </Link>
      </div>
    );
  }
}

FoodImage.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.shape({
    foodId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    foodName: PropTypes.string.isRequired,
    foodInfo: PropTypes.string.isRequired
  }).isRequired
}

export default FoodImage;