import React from 'react';
import PropTypes from 'prop-types';
import AlternativeFoodCarousel from "../../components/FoodInfoInquiry/AlternativeFoodCarousel";

const FoodDetailCarousel = ({foods, hasUserInfo}) => {
  return (
    <div className='alternative-food'>
      <AlternativeFoodCarousel foods={foods} hasUserInfo={hasUserInfo}/>
    </div>
  );
}

FoodDetailCarousel.propTypes = {
  foods: PropTypes.array,
  hasUserInfo: PropTypes.bool,
}

export default FoodDetailCarousel;