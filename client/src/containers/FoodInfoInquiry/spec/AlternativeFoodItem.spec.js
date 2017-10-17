import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AlternativeFoodItem from "../../../components/FoodInfoInquiry/AlternativeFoodItem";


describe('AlternativeFoodItem component', () => {
  const wrapper = shallow(<AlternativeFoodItem/>);

  it('should render <AlternativeFoodItem /> components', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render <AlternativeFoodItem props/>', () => {
    expect(wrapper.prop('food').length).toBeGreaterThanOrEqual(1);
  });

  it('should render div className="food-slider__food"', () => {
    expect(wrapper.find(".food-slider__food").length).toBeGreaterThanOrEqual(1);
  });

  it('should render div className="food-slider__info"', () => {
    expect(wrapper.find(".food-slider__info").length).toBeGreaterThanOrEqual(1);
  });
});