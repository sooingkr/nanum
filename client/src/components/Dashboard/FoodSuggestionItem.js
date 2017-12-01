import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const FoodSuggestionItem = ({ data: { globalId, imageUrl, name } }) => (
  <div className="food-suggestion-item" id={globalId}>
    <Link to={`/foods/${globalId}`}>
      <figure className="food-suggestion-item__thumbnail">
        <Image src={imageUrl} alt={name} responsive />
      </figure>
      <div className="food-suggestion-item__name">
        <span>{name}</span>
      </div>
    </Link>  
  </div>
);

FoodSuggestionItem.propTypes = {
  data: PropTypes.shape({
    globalId: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};

export default FoodSuggestionItem;
