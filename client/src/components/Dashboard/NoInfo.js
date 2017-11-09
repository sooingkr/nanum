import React from 'react';
import { Link } from 'react-router-dom';

const NoInfo = (conditionFn) => (Component) => (props) => {
  return conditionFn(props) 
  ? (
    <div className="no-info">
      <Component {...props} />
      <Link to="/user/edit" className="no-info__message">
        <p>정보를 입력하시면 오늘의 식품을 추천받으실 수 있습니다</p>
      </Link>
      <div className="no-info__overlay"></div>
    </div>
  )
  : <Component {...props} />;
}

export default NoInfo;