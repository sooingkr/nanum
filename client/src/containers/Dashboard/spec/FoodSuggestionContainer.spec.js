import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { FoodSuggestionContainer } from '../FoodSuggestionContainer';
import { foodSuggestions } from '../../../service/mockAPI/responses';

describe('FoodSuggestionContainer component', () => {
  let props;
  let mountedFoodSuggestion;
  const mountedWithContext = () => {
    if(!mountedFoodSuggestion) {
      mountedFoodSuggestion = mount(
        <MemoryRouter initialEntries={['/dashboard']} >
          <FoodSuggestionContainer {...props} />
        </MemoryRouter>
      );
    }
    return mountedFoodSuggestion;
  }

  beforeEach(() => {
    props = foodSuggestions();
    mountedFoodSuggestion = undefined;
  });

  it('renders without crashing', () => {
    shallow(<FoodSuggestionContainer {...props}/>);
  });

  it('should display the recommended foods', () => {
    const container = shallow(<FoodSuggestionContainer {...props}/>);
    expect(container.find('.food-suggestions').exists()).toBeTruthy();
  });

  it('should show a reason for recommended foods', () => {
    const container = mountedWithContext();
    expect(container.find('.food-suggestions__reason').exists()).toBeTruthy();
  });

  it('should show a carousel for recommended foods', () => {
    const container = mountedWithContext();
    expect(container.find('.food-suggestions__carousel').exists()).toBeTruthy();
  });

  describe('recommended foods carousel', () => {
    let container;

    beforeAll(() => {
      container = mountedWithContext();
    });

    it('should show a thumbnail and name for each food', () => {
      const foods = container.find('.food-suggestion-item');
      foods.forEach(food => {
        expect(food.children()).toHaveLength(2);
      });
    });
  });
});
