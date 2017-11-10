import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AlternativeFoodCarousel from "../../../components/FoodInfoInquiry/AlternativeFoodCarousel";

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
});