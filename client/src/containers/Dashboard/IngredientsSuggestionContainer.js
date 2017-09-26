import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IngredientsSuggestionContainer extends Component {
  render() {
    const { data: { heading, recommendation, ingredients } } = this.props;
    return (
      <div className="ingredients-suggestion">
        <h3 className="ingredients-suggestion__heading">{heading}</h3>
        <div className="ingredients-suggestion__content">
          <p>{recommendation}</p>
          { ingredients.map(ingredient => (
            <p>{ingredient.name}</p>
          ))}
        </div>
      </div>
    )
  }
}
IngredientsSuggestionContainer.propTypes = {
  data: PropTypes.object
}
export default IngredientsSuggestionContainer;