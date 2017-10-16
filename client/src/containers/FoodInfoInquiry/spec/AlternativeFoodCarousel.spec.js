import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AlternativeFoodCarousel from "../../../components/FoodInfoInquiry/AlternativeFoodCarousel";
import AlternativeFoodItem from "../../../components/FoodInfoInquiry/AlternativeFoodItem";


describe('AlternativeFoodCarousel component', () => {
  const wrapper = shallow(<AlternativeFoodCarousel/>);

  it('should render <AlternativeFoodCarousel /> components', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render div className="food-carousel__sliders"', () => {
    expect(wrapper.find(".food-carousel__sliders").length).toBe(1);
  });

  it('should render div className="food-food-carousel__item"', () => {
    expect(wrapper.find(".food-food-carousel__item").length).toBeGreaterThanOrEqual(1);
  });

  const FoodItemCarousel = wrapper.find(AlternativeFoodItem);

  describe('AlternativeFoodItem component with props', () => {
    it('should render <AlternativeFoodItem props/>', () => {
      expect(FoodItemCarousel.prop('food').length).toBeGreaterThanOrEqual(1);
    });

    it('should render div className="food-slider__food"', () => {
      expect(FoodItemCarousel.find(".food-slider__food").length).toBeGreaterThanOrEqual(1);
    });

    it('should render div className="food-slider__info"', () => {
      expect(FoodItemCarousel.find(".food-slider__info").length).toBeGreaterThanOrEqual(1);
    });
  });
});