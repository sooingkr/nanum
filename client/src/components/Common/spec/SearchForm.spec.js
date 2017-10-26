import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchForm from './SearchForm';

describe('SearchForm component', () => {
  const searchWrapper = mount(<SearchForm>);

  it('should render div class="search-form"', () => {
    expect(searchWrapper.find('.search-form').length).toBe(1)
  });
})

