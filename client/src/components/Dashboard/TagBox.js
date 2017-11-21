import React from 'react';
import PropTypes from 'prop-types';

const TagBox = ({ id, text }) => (
  <button className="tagbox">
    <span className="tagbox__text">{text}</span>
  </button>
)

TagBox.propTypes = {
  text: PropTypes.string.isRequired,
}

export default TagBox;