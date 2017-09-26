import React, {Component} from 'react';
import FoodIntakeContainer from './FoodIntakeContainer';

export class DashboardPage extends Component {
  render() {
    return (
      <div>
        <h2>Dashboard Page</h2>

        <FoodIntakeContainer />
      </div>
    )
  }
}

