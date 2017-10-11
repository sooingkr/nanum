import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

const TagBox = ({ id, text, onRemove }) => (
  <button className="tagbox" onClick={() => onRemove(id)}>
    <span className="tagbox__text">{text}</span>
    <Glyphicon className="tagbox__close" glyph="remove" />
  </button>
)

TagBox.propTypes = {
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default TagBox;