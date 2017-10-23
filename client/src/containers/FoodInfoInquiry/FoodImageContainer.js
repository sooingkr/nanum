import React, { Component } from 'react';
import { PropTypes } from "prop-types";

import FoodImage from '../../components/FoodInfoInquiry/FoodImage';

class FoodImageContainer extends Component {

  render() {
    const { images } = this.props;
    return (
      <div className="food-image">
        {images.map((image, index) =>
          <FoodImage key={index} index={index} image={image}/>
        )}
      </div>
    );
  }
}

FoodImageContainer.propTypes = {
  images: PropTypes.array.isRequired
}

export default FoodImageContainer;