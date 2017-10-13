import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

import SearchBox from "../../components/SearchBox/SearchBox.js";
import ChatBoxContainer from "./ChatBoxContainer.js";

import "./Home.scss";

class Home extends Component {
  render() {
    const userId = '1';
    const messages = [
      {
        id: '1',
        content: '',
        admes: 'HACCP 교육 일정을 알려주세요.'
      },
      {
        id: '2',
        content: '무엇을 도와드릴까요?',
        admes: 'HACCP 교육 일정을 알려주세요.'
      },
      {
        id: '3',
        content: '무엇을 도와드릴까요?',
        admes: ''

      },
      {
        id: '1',
        content: '무엇을 도와드릴까요?',
        admes: 'HACCP 교육 일정을 알려주세요.'

      },
      {
        id: '1',
        content: '무엇을 도와드릴까요?',
        admes: 'ad message 2'


      },
      {
        id: '1',
        content: '무엇을 도와드릴까요?',
        admes: ''

      }
    ];
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
              <ChatBoxContainer userId={userId} messages={messages}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;