import React from 'react';
import Loader from '../Common/Loader';

const withLoader = (conditionFn) => (Component) => (props) => (
  <div>
    <Component {...props} />
    { conditionFn(props) && 
      <Loader />
    }
  </div>
)

export default withLoader;