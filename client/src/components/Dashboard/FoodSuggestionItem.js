import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const FoodSuggestionItem = ({ data: { id, imageUrl, name } }) => (
  <div className="food-suggestion-item" id={id}>
    <figure className="food-suggestion-item__image">
      <Image src={imageUrl} alt={name} responsive />
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
