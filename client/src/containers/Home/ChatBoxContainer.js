import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from "prop-types";
import { isEmpty } from "lodash";

import { Row, Col, Button, Collapse, Well, Form, FormGroup, FormControl, Image} from "react-bootstrap";
import ChatBox from "../../components/Home/ChatBox";

import { HomeDuck } from "./HomeDuck";

const InputMessageBoxView = ({ input, pristine, submitting }) => (
  <FormGroup>
    <FormControl type="text" placeholder="네, 작업장입니다|" {...input}/>
    <Button className="btn-send" type="submit" disabled={pristine || submitting}>
      <i className="fa fa-paper-plane" aria-hidden="true"/>
    </Button>
  </FormGroup>
);

class SendMessageFormView extends Component {

  render() {
    const { handleSubmit, pristine, submitting, typingMessage } = this.props;

    // notify that user is typing
    typingMessage(!pristine);

    return (
      <Form onSubmit={handleSubmit}>
        <Field name="message" component={ InputMessageBoxView } {...{ pristine, submitting, typingMessage }}/>
      </Form>
    );
  }
}

const SendMessageForm = reduxForm({
  form: 'SendMessageForm',
})(SendMessageFormView);

export class ChatBoxContainer extends Component {

  closeAlert() {
    return (
      <Redirect to={{ pathname: '/join'}}/>
    );
  }

  render() {
    const { userId, messages, openChatBox, toggleChatBox, typingMessage, formData, isTyping } = this.props;

    return (
      <div className="chat-box">
        <div className="block__chat-box">
          <Button className="btn-open" title="무엇을 도와드릴까요?" onClick={toggleChatBox}>
            무엇을 도와드릴까요? <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </Button>
          {!isEmpty(userId) &&
            <Collapse in={openChatBox}>
              <div>
                <Well>
                  <div className="chat-box__title">
                    <Row>
                      <Col xs={8} xsPush={2}><h5 className="chat-box__title-text"><i
                        className="fa fa-comment-o"></i><span>기술상담</span></h5></Col>
                      <Col xs={1} xsPush={2}><Button className="btn-close" onClick={toggleChatBox}><span
                        className="line"></span></Button></Col>
                    </Row>
                  </div>
                  <div className="chat-messages">
                    <div className="block__chat-messages">
                      {
                        !(isEmpty(messages)) ?
                          messages.map((message, index) =>
                            <ChatBox key={index} index={index} message={message} isTyping={isTyping}></ChatBox>
                        ) : null
                      }
                    </div>
                    <div className="chat-messages__form">
                      <SendMessageForm onSubmit={formData} typingMessage={typingMessage}/>
                    </div>
                  </div>
                </Well>
              </div>
            </Collapse>
          }
        </div>
        <div className="image-block user-icon">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png" alt="user-image"
            circle/>
        </div>
      </div>
    );
  }
}

ChatBoxContainer.propTypes = {
  userId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  messages: PropTypes.array,
  openChatBox: PropTypes.bool.isRequired,
  toggleChatBox: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  typingMessage: PropTypes.func.isRequired,
  closeAlert: PropTypes.func
};

const mapStateToProps = state => {
  const homeState = state[HomeDuck.storeName];
  return {
    openChatBox: homeState.openChatBox,
    isTyping: homeState.isTyping,
  };
};

const mapDispatchToProps = {
  toggleChatBox: HomeDuck.actions.toggleChatBox,
  typingMessage: HomeDuck.actions.typingMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxContainer);