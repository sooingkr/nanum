import React from 'react';
import { shallow, mount } from 'enzyme';
import IngredientsSuggestionContainer from '../IngredientsSuggestionContainer';

describe('IngredientsSuggestionContainer', () => {
  let props;
  let mountedIngredientsSuggestion;

  const IngredientsSuggestion = (props) => {
    if(!mountedIngredientsSuggestion) {
      mountedIngredientsSuggestion = mount(
        <IngredientsSuggestionContainer {...props} />
      );
    }
    return mountedIngredientsSuggestion;
  }

  beforeEach(() => {
    props = {
      heading: "Today's recommendation",
      recommendation: "Mineral intake recommended",
      ingredients: [
        { id: "1asd", name: "Tomato" },
        { id: "1asd3", name: "Carrot" },
        { id: "1asd55", name: "Spinach" },
      ]
    };
    mountedIngredientsSuggestion = undefined;
  });

  it('renders without crashing', () => {
    shallow(<IngredientsSuggestionContainer {...props} />);
  });

  it('renders ingredients list when ingredients are passed in', () => {
    const wrapper = IngredientsSuggestion(props);
    const suggestionList = wrapper.find('.ingredient-suggestion__list');
    const suggestionItems = suggestionList.find('.ingredient-suggestion__item');
    expect(suggestionList).toHaveLength(1);
    expect(suggestionItems.length).toEqual(3);
  });

});