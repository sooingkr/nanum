import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { isEmpty } from "lodash";

import {Collapse, Well } from "react-bootstrap";

import TabComponent from "../../components/Common/ChatBox/ChatTabs";

import { HomeDuck } from "./HomeDuck";


export class ChatBoxContainer extends Component {

  closeAlert() {
    return (
      <Redirect to={{ pathname: '/join'}}/>
    );
  }

  render() {
    const { userId, toggleChatBox, openChatBox, typingMessage } = this.props;
    const tabData = {
      messages: this.props.messages,
      toggleChatBox: toggleChatBox,
      openChatBox: openChatBox,
      typingMessage: typingMessage,
      isTyping: this.props.isTyping

    }

    return (
      <div className="chat-box">

        <div className="block__chat-box">
          {/*<Button className="btn-open" title="무엇을 도와드릴까요?" onClick={toggleChatBox}>*/}
            {/*무엇을 도와드릴까요? <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>*/}
          {/*</Button>*/}

          {!isEmpty(userId) &&
            <Collapse in={openChatBox}>
              <div>
                <Well>
                  <TabComponent tabData={tabData}></TabComponent>
                </Well>
              </div>

            </Collapse>
          }
        </div>
        {/*<div className="image-block user-icon">*/}
          {/*<Image*/}
            {/*src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png" alt="user-image"*/}
            {/*circle/>*/}
        {/*</div>*/}
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