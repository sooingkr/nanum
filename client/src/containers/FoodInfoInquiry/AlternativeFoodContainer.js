import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import AlternativeFoodCarousel from "../../components/FoodInfoInquiry/AlternativeFoodCarousel";

class AlternativeFoodContainer extends Component {
  render() {
    const { foods } = this.props;

    return (
      <div className='alternative-food'>
        <AlternativeFoodCarousel foods={foods}/>
      </div>
    );
  }
}

AlternativeFoodContainer.propTypes = {
  foods: PropTypes.array.isRequired
}

export default AlternativeFoodContainer;