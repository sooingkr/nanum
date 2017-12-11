import React from 'react';
import PropTypes from 'prop-types';
import AlternativeFoodCarousel from "../../components/FoodInfoInquiry/AlternativeFoodCarousel";

const FoodDetailCarousel = ({foods, hasUserInfo, status}) => {
  return (
    <div className='alternative-food'>
      <AlternativeFoodCarousel foods={foods} hasUserInfo={hasUserInfo} status={status} />
    </div>
  );
}

FoodDetailCarousel.propTypes = {
  foods: PropTypes.array,
  hasUserInfo: PropTypes.bool,
}

export default FoodDetailCarousel;