import React from 'react';
import { shallow } from 'enzyme';
import Navigation from "./Navigation";

describe('<Navigation />', () => {
  it('should render <Navigation /> components', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper).toMatchSnapshot();
  });
});