import React from 'react';

const RadioField = (props) => {
  const { input, meta, className, ...rest } = props;
  const classes = input.checked ? className + ' checked' : className;
  return (<input 
    {...props.input}
    {...rest}
    className={classes}
  />)
}

export default RadioField;