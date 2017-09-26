import React from 'react';
import PropTypes from 'prop-types';

const FoodSuggestionItem = ({ data: { id, imageUrl, name } }) => (
  <div className="food-suggestion-item" id={id}>
    <figure className="food-suggestion-item__image">
      <img src={imageUrl} alt={name} />
    </figure>
    <p className="food-suggestion-item__name">{name}</p>
  </div>
);

FoodSuggestionItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};

export default FoodSuggestionItem;
