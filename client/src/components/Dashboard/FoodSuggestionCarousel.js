import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Common/Carousel';
import FoodSuggestionItem from './FoodSuggestionItem';
import PrevArrow from '../../assets/images/icons/carousalarrow_prev.svg';
import NextArrow from '../../assets/images/icons/carousalarrow_next.svg';

const CarouselArrow = ({ direction, onClick, className }) => {
  const classes = className + ' carousel-arrow carousel-arrow--' + direction;
  const arrow = direction === 'next' ? NextArrow : PrevArrow;

  return (
    <div className={classes} onClick={onClick}>
      <img src={arrow} alt={direction} />
    </div>
  )
}

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
  arrows: true,
  centerMode: false,
  dots: false,
  draggable: false,
  variableWidth: true,
  nextArrow: <CarouselArrow direction='next' />,
  prevArrow: <CarouselArrow direction='prev' />,
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
      }
    },
    {
      breakpoint: 3000,
      settings: {
        ...basicCarouselSettings,
        ...desktopCarouselSettings,
        slidesToShow: 6,
      }
    }
  ]
};

const FoodSuggestionCarousel = (props) => (
  <Carousel settings={carouselSettings}  className="food-suggestion-slider">
    { props.data.map(foodItem => (
      <div key={foodItem.globalId} style={{width: 214}}>
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