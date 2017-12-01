import React from 'react';
import { Link } from 'react-router-dom';
import { makeNoInfoLink } from '../../utils/AppUtils'

const NoInfo = (
  conditionFn, 
  defaultProps={}, 
  label, 
  link,
  isExternal,
) => (Component) => (props) => {
  let noInfoObj;
  if (!link && !isExternal) {
    noInfoObj = makeNoInfoLink(props.hasUserInfo, props.status)
  } else {
    noInfoObj = { link, isExternal };
  }
  return conditionFn(props) 
  ? (
    <div className="no-info">
      <Component {...props} {...defaultProps} />
      { noInfoObj.isExternal 
        ? (
          <a href={noInfoObj.link} className="no-info__message">
            <p>{label}</p>
          </a>
        )
        : (
          <Link to={noInfoObj.link} className="no-info__message">
            <p>{label}</p>
          </Link>
        )
      }
      
      <div className="no-info__overlay"></div>
    </div>
  )
  : <Component {...props} />;
}

export default NoInfo;