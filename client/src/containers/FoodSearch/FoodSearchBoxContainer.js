import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm';

class FoodSearchBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    }
  }
  
  handleSubmit = (values) => {
    console.log(values);
  }

  onExpand = () => {
    this.setState({isExpanded: true});
  }

  onClose = () => {
    this.setState({isExpanded: false});
  }

  render() {
    const classNames = this.state.isExpanded ? "food-search__box is-expanded" : "food-search__box";
    return (
      <div className={classNames}>
        <SearchForm 
          onSubmit={this.handleSubmit} 
          isExpanded={this.state.isExpanded}
          onExpand={this.onExpand}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default FoodSearchBoxContainer;