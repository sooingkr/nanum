import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { FoodIntakeTrackingContainer } from '../FoodIntakeTrackingContainer';
import { foodIntakeTracking } from '../../../service/mockAPI/responses';

describe("FoodIntakeTrackingContainer component", () => {
  let props;
  let mountedFoodIntake;
  const mountedWithContext = () => {
    if(!mountedFoodIntake) {
      mountedFoodIntake = mount(
        <MemoryRouter initialEntries={['/dashboard']} >
          <FoodIntakeTrackingContainer {...props} />
        </MemoryRouter>
      );
    }
    return mountedFoodIntake;
  }

  beforeEach(() => {
    props = foodIntakeTracking();

    mountedFoodIntake = undefined;
  });

  it('renders without crashing', () => {
    shallow(<FoodIntakeTrackingContainer {...props} />);
  });

  describe('when given calories props', () => {
    it('should render calories progress bar', () => {
      expect(mountedWithContext().find('.food-intake__progress')).toHaveLength(1);
    });

    it('should render calories progress bar with correct tracking info', () => {
      const { target, current } = props.foodIntakeTracking.calories;
      const pattern = `${target}|${current}`;

      const progressBar = mountedWithContext().find('.food-intake__progress');
      progressBar.find('span').forEach(DOMnode => {
        expect(DOMnode.text()).toMatch(new RegExp(pattern));
      });
    });
  });

  describe('when given meals info (when) props', () => {
    it("should display lists of user's intake", () => {
      expect(mountedWithContext().find('.food-intake__meals').exists()).toBeTruthy();
    });

    it("should display exactly 3 lists of user's intake", () => {
      expect(mountedWithContext().find('.food-intake__meals').find('.food-intake-list'))
        .toHaveLength(3);
    });
  });

  describe('when not given meals info (when) props', () => {
    it("doesn't render lists of user's intake", () => {
      props.foodIntakeTracking.when = {};
      expect(mountedWithContext().find('.food-intake__meals').find('.food-intake-list'))
        .toHaveLength(0);
    });
  });
});

