import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';


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
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;