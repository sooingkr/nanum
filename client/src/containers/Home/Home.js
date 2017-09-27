import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

import SearchBox from "../../components/SearchBox/SearchBox.js";

import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Grid>
          <Row>
            <Col md={3} className="home-search">
              <div className="home-search__text">
                HACCP
              </div>
              <SearchBox typeName="default"/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;