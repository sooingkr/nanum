import React from 'react';

const NoInfo = (conditionFn, defaultProps={}, label, link) => (Component) => (props) => {
  return conditionFn(props) 
  ? (
    <div className="no-info">
      <Component {...props} {...defaultProps} />
      <a href={link} className="no-info__message">
        <p>{label}</p>
      </a>
      <div className="no-info__overlay"></div>
    </div>
  )
  : <Component {...props} />;
}

export default NoInfo;