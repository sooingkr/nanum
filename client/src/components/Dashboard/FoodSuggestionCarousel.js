import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import FoodSuggestionItem from './FoodSuggestionItem';

const carouselSettings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const FoodSuggestionCarousel = (props) => (
  <Carousel settings={carouselSettings}>
    { props.data.map(foodItem => (
      <div key={foodItem.id}>
        <FoodSuggestionItem data={foodItem}/>
      </div>
    ))}
  </Carousel>
);

FoodSuggestionCarousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }))
}

export default FoodSuggestionCarousel;