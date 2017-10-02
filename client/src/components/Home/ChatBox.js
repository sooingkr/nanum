import React, { Component } from "react";
import { Row, Col, Button, Collapse, Well, Form, FormGroup, FormControl, Image} from "react-bootstrap";

class ChatBox extends Component {
  constructor(props ) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div className="chat-box">
        <div className="chat-box_block">
          <Button className="btn-chat-open" title="무엇을 도와드릴까요?" onClick={ ()=> this.setState({ open: !this.state.open })}>
            무엇을 도와드릴까요? <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>

          </Button>
          <Collapse in={this.state.open}>
            <div>
              <Well>
                <div className="title-block">
                  <Row>
                    <Col xs={8} xsPush={2} ><h5 className="title text-center"><i className="fa fa-comment-o"></i><span>기술상담</span></h5></Col>
                    <Col xs={1} xsPush={1}><Button className="btn-close"><span className="line"></span></Button></Col>
                  </Row>
                </div>
                <div className="chat-messages">
                  <div className="chat-messages_block">

                  </div>
                  <div className="chat-messages_form">
                    <Form>
                      <FormGroup>
                        <FormControl type="text" placeholder="네, 작업장입니다|" />
                        <Button className="btn-send"><i className="fa fa-paper-plane" aria-hidden="true"></i></Button>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </Well>
            </div>
          </Collapse>
        </div>
        <div className="image-block">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png" circle/>
        </div>
      </div>
    );
  }
}
export default ChatBox;