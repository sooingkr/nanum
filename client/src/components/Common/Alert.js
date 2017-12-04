import React from 'react';
import PropTypes from 'prop-types';
import InfoLogo from '../../assets/images/icons/info.svg';

const Alert = ({ message, type }) => {
  const classes = `alert alert--${type.toLowerCase()}`;
  return (
    <div className={classes}>
      {AlertIcon(type)}
      <p>{message}</p>  
    </div>
  );
}

function AlertIcon(alertType) {
  switch(alertType) {
    case 'DANGER':
      return <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>;
    case 'INFO':
      return <img src={InfoLogo} width={20} height={20} alt="info"/>;
    default:
      return <img src={InfoLogo} width={20} height={20} alt="info"/>;
  }
}
  
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['DANGER', 'INFO']),
}

Alert.defaultProps = {
  type: 'INFO',
}

export default Alert;