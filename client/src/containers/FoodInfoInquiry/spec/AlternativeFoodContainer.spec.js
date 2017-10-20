import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AlternativeFoodContainer from '../AlternativeFoodContainer';
import AlternativeFoodCarousel from "../../../components/FoodInfoInquiry/AlternativeFoodCarousel";

describe('AlternativeFoodContainer component', () => {
  const wrapper = shallow(<AlternativeFoodContainer/>);

  it('should render <AlternativeFoodContainer /> components', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render div className="alternative-food"', () => {
    expect(wrapper.find(".alternative-food").length).toBe(1);
  });

  describe('AlternativeFoodCarousel component with props', () => {
    it('should render <AlternativeFoodCarousel props/>', () => {
      expect(wrapper.find(AlternativeFoodCarousel).prop('foods').length).toBeGreaterThanOrEqual(1);
    });
  });

});