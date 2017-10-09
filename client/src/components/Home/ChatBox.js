import React, { Component } from "react";
import { isEmpty } from "lodash";
import { PropTypes } from 'prop-types';

import { Image } from "react-bootstrap";

import "./ChatBox.scss";

class ChatBox extends Component {
  render() {
    const { index, message: { content, admes } } = this.props;

    return (
      <div className="chat-messages__text" key={ index }>
        { isEmpty( content ) ? null
          :
          <div className="chat-messages__user">
            <div className="image-block pull-left">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                circle/></div>
            <div className="chat-messages__box user">{ content }</div>
          </div>
        }

        { isEmpty( admes ) ? null
          :
          <div className="chat-messages__box supporter">
            { admes }
          </div>
        }
      </div>
    );
  }
}

ChatBox.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    admes: PropTypes.string
  }).isRequired
}

export default ChatBox;