import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const SearchResultItem = ({ id, name, manufacturer, imageUrl }) => (
  <div className="search-result-item">
    <div className="search-result-item__image">
      <Image src={imageUrl} responsive />
    </div>
    <div className="search-result-item__content">
      <h3 className="search-result-item__name">
        <Link to={'/foods/' + id}>
          {name}
        </Link>
      </h3>
      <h4 className="search-result-item__manufacturer">{manufacturer}</h4>
    </div>
    <div className="search-result-item__button">
      <Link to={'/foods/' + id} className="button button--arrow"/>
    </div>
  </div>
)

SearchResultItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  manufacturer: PropTypes.string,
  imageUrl: PropTypes.string,
}

export default SearchResultItem;