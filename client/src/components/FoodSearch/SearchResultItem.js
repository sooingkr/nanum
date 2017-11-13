import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const SearchResultItem = ({ foodId, name, manufacturer, imageUrl }) => (
  <div className="search-result-item">
    <div className="search-result-item__image">
      <Image src={imageUrl} responsive />
    </div>
    <div className="search-result-item__content">
      <h3 className="search-result-item__name">{name}</h3>
      <h4 className="search-result-item__manufacturer">{manufacturer}</h4>
    </div>
    <div className="search-result-item__button">
      <Link to={'/products/' + foodId} className="button button--arrow" />
    </div>
  </div>
)

SearchResultItem.propTypes = {
  foodId: PropTypes.string.isRequired,
  name: PropTypes.string,
  manufacturer: PropTypes.string,
  imageUrl: PropTypes.string,
}

export default SearchResultItem;