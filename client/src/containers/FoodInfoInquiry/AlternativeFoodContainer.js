import React, { Component } from 'react';

import Carousel from "../../components/Carousel";

import AlternativeFoodCarousel from "../../components/FoodInfoInquiry/AlternativeFoodCarousel";

class AlternativeFoodContainer extends Component {
  render() {
    const { alternativeFoods } = this.props;

    const settingSlider = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2
    };

    return (
      <div className='alternative-food'>
        <Carousel className='food-carousel__sliders' settings={ settingSlider }>
          {
            alternativeFoods.map((item, index) =>
              <AlternativeFoodCarousel key={index} alternativeFood={ item }/>
            )
          }
        </Carousel>
      </div>
    );
  }
}

export default AlternativeFoodContainer;