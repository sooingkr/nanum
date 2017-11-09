import React from 'react';
import { PropTypes } from 'prop-types';

import { isArray } from 'lodash';

import Carousel from '../Common/Carousel';
import AlternativeFoodItem from './AlternativeFoodItem';

const AlternativeFoodCarousel = ({foods}) => {

    const foodCarouselSettings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        { breakpoint: 1025, settings: { slidesToShow: 1, slidesToScroll: 1 }},
        { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 2 }},
        { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2, vertical: true}}]
    };

  return (
      <Carousel className='food-carousel__sliders' settings={foodCarouselSettings}>
        {
          isArray(foods) && foods.map((food, index) =>
            <div className="food-carousel__item" key={ index }>
              <AlternativeFoodItem food={food}/>
            </div>
          )
        }
      </Carousel>
    );
}

AlternativeFoodCarousel.propTypes = {
  foods: PropTypes.array
}

export default AlternativeFoodCarousel;