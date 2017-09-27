import React from 'react';
import { shallow } from 'enzyme';
import UserInfoContainer from '../UserInfoContainer';

describe('UserInfoContainer component', () => {
  it('renders without crashing', () => {
    shallow(<UserInfoContainer />);
  })
});
