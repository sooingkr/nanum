import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import './FoodSuggestionItem.scss';

const FoodSuggestionItem = ({ data: { id, thumbUrl, name } }) => (
  <div className="food-suggestion-item" id={id}>
    <figure className="food-suggestion-item__thumbnail">
      <Image src={thumbUrl} alt={name} responsive />
    </figure>
    <Link to={`/foods/${id}`} className="food-suggestion-item__name">
      <span>
        {name}
      </span>
    </Link>
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
