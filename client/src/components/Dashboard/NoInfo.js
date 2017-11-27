import React from 'react';
import { Link } from 'react-router-dom';

const NoInfo = (conditionFn, defaultProps={}, label, link) => (Component) => (props) => {
  return conditionFn(props) 
  ? (
    <div className="no-info">
      <Component {...props} {...defaultProps} />
      <Link to={link} className="no-info__message">
        <p>{label}</p>
      </Link>
      <div className="no-info__overlay"></div>
    </div>
  )
  : <Component {...props} />;
}

export default NoInfo;