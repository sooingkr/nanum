import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";

import PropTypes from 'prop-types';

class SearchBox extends Component {
  handleChange() {

  }
  searchFood(type) {

  }
  render() {
    const { typeName } = this.props;

    return(
      <div className="search-box">
        <Form>
          <FormGroup className={typeName === 'default' ? 'form-group_border' : ''}>
            <FormControl type="text" placeholder="업체명, 제품명" onChange={this.handleChange} className={ typeName === 'default' ? '' : 'hidden-xs-up' }></FormControl>
            <Button className={typeName === 'default' ? 'btn-search_default' : ''} type="submit" onClick={this.searchFood(typeName)}><span className="glyphicon glyphicon-search"></span>
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

SearchBox.propTypes = {
  typeName: PropTypes.string.isRequired
}

export default SearchBox;