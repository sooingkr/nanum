import React from 'react';
import { PropTypes } from 'prop-types';
import { isArray, isEmpty } from 'lodash';
import Carousel from '../Common/Carousel';
import AlternativeFoodItem from './AlternativeFoodItem';
import NoInfo from '../Dashboard/NoInfo';
import { mockFoodDetails } from '../../service/mockAPI/responses';

const foodCarouselSettings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    { 
      breakpoint: 480, 
      settings: { 
        slidesToShow: 2, 
        vertical: true, 
        arrows: false
      }
    }
  ]
};

let AlternativeFoodCarousel = ({foods}) => (
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

const noInfoCondition = (props) => {
  return !props.foods || isEmpty(props.foods);
}

AlternativeFoodCarousel = NoInfo(
  noInfoCondition, 
  { foods: mockFoodDetails.alternativeFoods },
  '정보를 입력하시면 대체식품을 추천받으실 수 있습니다',
  '/realAuthentication.do',
  false,
)(AlternativeFoodCarousel);

AlternativeFoodCarousel.propTypes = {
  foods: PropTypes.array
}

export default AlternativeFoodCarousel;