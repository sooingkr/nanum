import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

import SearchBox from "../../components/SearchBox/SearchBox.js";
import ChatBoxContainer from "./ChatBoxContainer.js";

import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Grid>
          <Row>
            <Col md={4} className="home-search">
              <div className="home-search__text">
                <span>안심하고 먹을 수 있는</span><br/>
                <span>HACCP</span>
              </div>
              <SearchBox typeName="default"/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ChatBoxContainer/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;