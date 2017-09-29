import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import UserInfoContainer from '../UserInfoContainer';

describe('UserInfoContainer component', () => {
  let props;
  let mountedUserInfo;

  beforeEach(() => {
    props = {
      user: {
        male: true,
        name: "David Coffee",
        interests: [
          { id: "asdasd1", text: "soccer" },
          { id: "asdd1", text: "Scala" },
          { id: "asdd1asd", text: "penny" },
        ],
        diseases: [
          { id: "123asd", text: "suck shti" },
          { id: "123as2d", text: "psycho" },
          { id: "123asggd", text: "obese" },
        ]
      }
    };

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
      expect(mountedUserInfo.text()).toContain("David Coffee");
    });
    
    it("should display the user's interests and diseases", () => {
      expect(mountedUserInfo.find('.user-info__interests-disease').children().exists())
        .toBeTruthy();
    });
  });
});
