import React, { Component } from 'react';
import PropTypes from 'prop-types';

const mockIngredientsSuggestion = {
  heading: "Today's recommendation",
  recommendation: "Mineral intake recommended",
  ingredients: [
    { id: "1asd", name: "Tomato" },
    { id: "1asd3", name: "Carrot" },
    { id: "1asd55", name: "Spinach" },
  ]
};

class IngredientsSuggestionContainer extends Component {
  render() {
    const { heading, recommendation, ingredients } = mockIngredientsSuggestion;
    return (
      <div className="ingredients-suggestion">
        <h3 className="ingredients-suggestion__heading">{heading}</h3>
        <div className="ingredients-suggestion__content">
          <p>{recommendation}</p>
          { ingredients.map(ingredient => (
            <p key={ingredient.id}>{ingredient.name}</p>
          ))}
        </div>
      </div>
    )
  }
}

// Uncomment this after connecting to Redux store
// IngredientsSuggestionContainer.propTypes = {
//   ingredientsSuggestions: PropTypes.objectOf(PropTypes.shape({
//     heading: PropTypes.string.isRequired,
//     recommendation: PropTypes.string.isRequired,
//     ingredients: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })).isRequired,
//   })).isRequired,
// }

export default IngredientsSuggestionContainer;