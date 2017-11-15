import React, { Component } from "react";
import { isEmpty } from "lodash";

import { Tabs, Tab } from "react-bootstrap";

import ChatBox from "../../Common/ChatBox/ChatBox";
import SendMessageForm from "../../Common/ChatBox/SendMessageForm";

class TabComponent extends Component {

  render() {

    const { tabData: { messages, isTyping, typingMessage, formData } } = this.props;
    // const { messages, toggleChatBox, typingMessage, formData, isTyping } = this.props;

    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="안전먹거리">
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
              <SendMessageForm className="chat-form__safefood" onSubmit={formData} typingMessage={typingMessage}/>
            </div>
          </div>
        </Tab>
        <Tab eventKey={2} title="HACCP기술상담">
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
              <SendMessageForm className="chat-form__haccp" onSubmit={formData} typingMessage={typingMessage}/>
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default TabComponent;