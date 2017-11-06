import React from 'react';
import Loader from '../Common/Loader';

const withLoader = (conditionFn) => (Component) => (props) => (
  <div className="with-loader">
    <Component {...props} />
    { conditionFn(props) && 
      <Loader theme={props.theme}/>
    }
  </div>
)

export default withLoader;