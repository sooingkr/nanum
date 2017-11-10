import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Common/Carousel';
import FoodSuggestionItem from './FoodSuggestionItem';

const FoodSuggestionCarouselArrow = ({ direction, onClick }) => (
  <div className="carousel-arrow-wrapper">
    <button className={"carousel-arrow carousel-arrow--" + direction} onClick={onClick}>
    </button>
  </div>
);

const basicCarouselSettings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  centerMode: false,
  draggable: true,
  slidesToScroll: 1,
};

const carouselSettings = {
  ...basicCarouselSettings,  
  nextArrow: <FoodSuggestionCarouselArrow direction="next"/>,
  prevArrow: null,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 924,
      settings: {
        ...basicCarouselSettings,
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
      }
    },
    {
      breakpoint: 1800,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 4,
        arrows: false,
      }
    },
    {
      breakpoint: 2400,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 6,
        arrows: false,
      }
    }
  ]
};

const FoodSuggestionCarousel = (props) => (
  <Carousel settings={carouselSettings}  className="food-suggestion-slider">
    { props.data.map(foodItem => (
      <div key={foodItem.globalId} className="food-suggestion">
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