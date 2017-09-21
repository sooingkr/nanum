import React, { Component } from 'react';
import { connect } from 'react-redux';

class FoodIntakeContainer extends Component {
  render() {
    return (
      <div></div>
    )
  }
}

// example container
export default connect()(FoodIntakeContainer);