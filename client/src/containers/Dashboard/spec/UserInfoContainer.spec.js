import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { UserInfoContainer } from '../UserInfoContainer';
import { currentUser } from '../../../service/mockAPI/responses';

describe('UserInfoContainer component', () => {
  let props;
  let mountedUserInfo;

  beforeEach(() => {
    props = currentUser();
    mountedUserInfo = undefined;
  });

  it('renders without crashing', () => {
    shallow(<UserInfoContainer {...props} />);
  });

  describe('when given valid props', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = (
        <MemoryRouter initialEntries={['/dashboard']} >
          <UserInfoContainer {...props} />
        </MemoryRouter>
      );
      mountedUserInfo = mount(wrapper);
    });

    it('should display user name', () => {
      expect(mountedUserInfo.text()).toContain("김레클 님");
    });
    
    it("should display the user's interests and diseases", () => {
      expect(mountedUserInfo.find('.user-info__details').children().exists())
        .toBeTruthy();
    });
  });
});
