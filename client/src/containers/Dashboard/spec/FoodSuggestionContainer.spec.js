import React from 'react';
import { shallow, mount } from 'enzyme';
import { FoodSuggestionContainer } from '../FoodSuggestionContainer';

describe('FoodSuggestionContainer component', () => {
  it('renders without crashing', () => {
    shallow(<FoodSuggestionContainer />);
  });
});
