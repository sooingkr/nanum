import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ theme }) => {
  const classes = `loader loader--${theme}`;
  return (
    <div className={classes}>
      Loading...
    </div>
  );
}

Loader.propTypes = {
  theme: PropTypes.oneOf(['green'])
}

Loader.defaultProps = {
  theme: 'green'
}

export default Loader;