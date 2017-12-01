import React from 'react';
import PropTypes from 'prop-types';
import { isArray, isEmpty } from 'lodash';
import Carousel from '../Common/Carousel';
import AlternativeFoodItem from './AlternativeFoodItem';
import NoInfo from '../Dashboard/NoInfo';
import AlternativeFood1 from '../../assets/images/alternative-food-1.png';
import AlternativeFood2 from '../../assets/images/alternative-food-2.png';

const mockFoodDetails = {
  name: "캔모아딸기아이스크림",
  imageUrl: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  diagnosticMessage: "임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.",
  calories: 1200,
  proteins: 102,
  carbohydrates: 340,
  fat: 201,
  alternativeFoods: [{
    id: "d3b8d7ba-c451-11e7-abc4-cec278b6b50a",
    imageUrl: AlternativeFood1,
    alternativeReason: "철분과 비타민A 가 함유된 HACCP 인증 식품인 <a href='/recommendation/#/foods/2'>요거트 그릭</a>을 대체식품으로 추천합니다."
  }, {
    id: "28146c5c-c452-11e7-abc4-cec278b6b50a",
    imageUrl: AlternativeFood2,
    alternativeReason: "철분과 비타민A 가 함유된 HACCP 인증 식품인 <a href='/recommendation/#/foods/2'>요거트 그릭</a>을 대체식품으로 추천합니다."
  }]
}
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
)(AlternativeFoodCarousel);

AlternativeFoodCarousel.propTypes = {
  foods: PropTypes.array,
  hasUserInfo: PropTypes.bool,
  status: PropTypes.number,
}

export default AlternativeFoodCarousel;