import React, { Component } from "react";
import { isEmpty } from "lodash";
import { PropTypes } from 'prop-types';

import { Image } from "react-bootstrap";

class ChatBox extends Component {

  render() {
    const { index, message: { content, admes }, isTyping } = this.props;

    const userId = '1';

    return (
      <div className="chat-messages__text">
        {
          index ?
            <div key={index}>
              {isEmpty(content) ? null
                :
                <div className="chat-messages__user">
                  <div className="image-block pull-left">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                      circle/></div>
                  <div className="chat-messages__box user">{content}</div>
                </div>
              }

              {isEmpty(admes) ? null
                :
                <div className="chat-messages__box supporter">
                  {admes}
                </div>
              }
            </div>
            :
            <div className={isTyping ? 'typingMessage' : ' '}>
              {

                (isTyping && userId) &&
                  <div className="chat-messages__user">
                    <div className="image-block pull-left">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                        circle/></div>
                    <div className="chat-messages__box user">...</div>
                  </div>
              }
              {
                (isTyping && isEmpty(userId)) &&
                  <div className="chat-messages__box supporter">...</div>
              }
            </div>
        }

      </div>
    );
  }
}

ChatBox.propTypes = {
  userId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  index: PropTypes.number.isRequired,
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    admes: PropTypes.string
  }).isRequired,
  isTyping: PropTypes.bool.isRequired
}

export default ChatBox;