import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Navigation from "./Navigation";

describe('<Navigation />', () => {
  it('should render <Navigation /> components', () => {
    const wrapper = shallow(<Navigation />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});