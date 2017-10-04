import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const FoodSuggestionItem = ({ data: { id, thumbUrl, name } }) => (
  <div className="food-suggestion-item" id={id}>
    <figure className="food-suggestion-item__thumbnail">
      <Image src={thumbUrl} alt={name} responsive />
    </figure>
    <p className="food-suggestion-item__name">
      <Link to={`/foods/${id}`}>
        {name}
      </Link>
    </p>
  </div>
);

FoodSuggestionItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};

export default FoodSuggestionItem;
