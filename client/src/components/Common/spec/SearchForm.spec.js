import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import {Form, Field, Button} from 'react-bootstrap';

import SearchForm from '../SearchForm';

describe('SearchForm component', () => {
  const searchWrapper = shallow(<SearchForm />);

  it('should render <SearchForm />', () => {
    expect(toJson(searchWrapper)).toMatchSnapshot();
  });

  it('should render div class="search-form"', () => {
    expect(searchWrapper.find('.search-form').length).toBe(1);
  });

  it('should render a form', () => {
    expect(searchWrapper.find(Form).length).toBe(1);
  });

  it('should render input text', () => {
    expect(searchWrapper.find(Field).length).toBe(1);
  });

  it('should render 2 buttons', () => {
    expect(searchWrapper.find(Button).length).toBeGreaterThanOrEqual(2);
  });
});


