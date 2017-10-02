import React, { Component } from "react";

import ChatBox from "../../components/Home/ChatBox.js";

class ChatBoxContainer extends Component {

  render() {
    const userId = '1';
    const messages = [
      {
        id: '1',
        content: 'message 1'
      },
      {
        id: '2',
        content: 'message 2'
      },
      {
        id: '3',
        content: 'message 3'
      },
      {
        id: '1',
        content: 'message 1'
      },
      {
        id: '1',
        content: 'message 1'
      },
      {
        id: '1',
        content: 'message 1'
      }
    ];
    return(
      <ChatBox userId={userId} messages={messages}></ChatBox>
    );
  }

}

export default ChatBoxContainer;