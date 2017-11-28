import React from 'react';
import { Link } from 'react-router-dom';

const NoInfo = (
  conditionFn, 
  defaultProps={}, 
  label, 
  link, 
  isInternal=true
) => (Component) => (props) => {
  return conditionFn(props) 
  ? (
    <div className="no-info">
      <Component {...props} {...defaultProps} />
      { isInternal 
        ? (
          <Link to={link} className="no-info__message">
            <p>{label}</p>
          </Link>
        )
        : (
          <a href={link} className="no-info__message">
            <p>{label}</p>
          </a>
        )
      }
      
      <div className="no-info__overlay"></div>
    </div>
  )
  : <Component {...props} />;
}

export default NoInfo;