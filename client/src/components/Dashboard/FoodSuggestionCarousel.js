import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Common/Carousel';
import FoodSuggestionItem from './FoodSuggestionItem';

const basicCarouselSettings = {
  arrows: false,
  dots: true,
  infinite: false,
  speed: 500,
  centerMode: false,
  draggable: true,
  slidesToScroll: 1,
};

const desktopCarouselSettings = {
  centerMode: false,
  dots: false,
}

const carouselSettings = {
  ...basicCarouselSettings,  
  responsive: [
    {
      breakpoint: 700,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 1,
        centerMode: true,
      }
    },
    {
      breakpoint: 924,
      settings: {
        ...basicCarouselSettings,
        ...desktopCarouselSettings,
        slidesToShow: 3,
        arrows: false,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 3,
        arrows: false,
        dots: false,
      }
    },
    {
      breakpoint: 1800,
      settings: {
        ...basicCarouselSettings,
        ...desktopCarouselSettings,
        slidesToShow: 4,
        arrows: false,
      }
    },
    {
      breakpoint: 3000,
      settings: {
        ...basicCarouselSettings,
        ...desktopCarouselSettings,
        slidesToShow: 6,
        arrows: false,
      }
    }
  ]
};

const FoodSuggestionCarousel = (props) => (
  <Carousel settings={carouselSettings}  className="food-suggestion-slider">
    { props.data.map(foodItem => (
      <div key={foodItem.globalId}>
        <FoodSuggestionItem data={foodItem}/>
      </div>
    ))}
  </Carousel>
);

FoodSuggestionCarousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    globalId: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }))
}

export default FoodSuggestionCarousel;