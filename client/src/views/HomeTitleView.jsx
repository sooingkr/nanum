/**
 * Created by manhvu on 9/21/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

export const TitleView = ({ className, title }) => (
  <h3 className={ className }>
    { title }
  </h3>
);

TitleView.propTypes = {
  title: PropTypes.string
};
