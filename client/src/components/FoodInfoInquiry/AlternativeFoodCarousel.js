import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Image } from "react-bootstrap";

import "./AlternativeFoodCarousel.scss";

class AlternativeFoodCarousel extends Component {
  render() {
    const { alternativeFood: { foodId, foodName, imgSrc, foodInfo } } = this.props;
    return(
      <div className="food-slider">
        <Link to={{pathname: "/product/id/" + foodId}}>
          <Image responsive src={imgSrc} alt={foodName}></Image>
          <div className="food-slider__info">{foodInfo}</div>
        </Link>
      </div>
    );
  }
}

export default AlternativeFoodCarousel;