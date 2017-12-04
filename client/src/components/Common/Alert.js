import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type }) => {
  const classes = `alert alert--${type.toLowerCase()}`;
  return (
    <div className={classes}>
      <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
      <p>{message}</p>
    </div>
  );
}
  
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['DANGER', 'INFO']),
}

Alert.defaultProps = {
  type: 'DANGER',
}

export default Alert;