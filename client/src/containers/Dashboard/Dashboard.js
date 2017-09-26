import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import FoodSuggestionContainer from './FoodSuggestionContainer';
import IngredientsSuggestionContainer from './IngredientsSuggestionContainer';

const mockIngredientsSuggestion = {
  heading: "Today's recommendation",
  recommendation: "Mineral intake recommended",
  ingredients: [
    { name: "Tomato" },
    { name: "Carrot" },
    { name: "Spinach" },
  ]
};

const mockFoodSuggestions = [
  {
    id: "1234",
    name: "chiecken",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "123",
    name: "chiecken 1",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "14",
    name: "chiecken 2",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "155",
    name: "chiecken 3",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "14545",
    name: "chiecken 4",
    imageUrl: "http://via.placeholder.com/200x150",
  }
];

class Dashboard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6} md={2}>
            <IngredientsSuggestionContainer data={mockIngredientsSuggestion}/>
          </Col>
          <Col sm={6} md={10}>
            <FoodSuggestionContainer data={mockFoodSuggestions}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Dashboard;
