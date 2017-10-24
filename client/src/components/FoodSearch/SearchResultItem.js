import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const SearchResultItem = ({ id, flavor, type, company, imageUrl }) => (
  <div className="search-result-item">
    <Link to={'/products/' + id} >
      <Image className="search-result-item__image" src={imageUrl} responsive />
    </Link>
    <div className="search-result-item__content">
      <h3 className="search-result-item__flavor">{flavor}</h3>
      <h3 className="search-result-item__type">{type}</h3>
      <h4 className="search-result-item__company">{company}</h4>
    </div>
  </div>
)

SearchResultItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  flavor: PropTypes.string,
  company: PropTypes.string,
  imageUrl: PropTypes.string,
}

export default SearchResultItem;