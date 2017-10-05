import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import FoodSuggestionItem from './FoodSuggestionItem';
import './FoodSuggestionCarousel.scss';

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
  centerMode: true,
  draggable: false,
};

const carouselSettings = {
  ...basicCarouselSettings,  
  className: "food-suggestion-slider",
  nextArrow: <FoodSuggestionCarouselArrow direction="next"/>,
  prevArrow: null,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 924,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1800,
      settings: {
        ...basicCarouselSettings,
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    }
  ]
};

const FoodSuggestionCarousel = (props) => (
  <Carousel settings={carouselSettings}>
    { props.data.map(foodItem => (
      <div key={foodItem.id} className="food-suggestion">
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