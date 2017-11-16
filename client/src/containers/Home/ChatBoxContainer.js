import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { isEmpty } from "lodash";

import { Collapse, Well } from "react-bootstrap";

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