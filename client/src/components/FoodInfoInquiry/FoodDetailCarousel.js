import React from 'react';
import { PropTypes } from 'prop-types';

import AlternativeFoodCarousel from "../../components/FoodInfoInquiry/AlternativeFoodCarousel";

const FoodDetailCarousel = ({foods}) => {

  return (
    <div className='alternative-food'>
      <AlternativeFoodCarousel foods={foods}/>
    </div>
  );
}

FoodDetailCarousel.propTypes = {
  foods: PropTypes.array.isRequired
}

export default FoodDetailCarousel;