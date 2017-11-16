import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import { Button, Form, FormGroup, FormControl} from "react-bootstrap";

const InputMessageBoxView = ({ input, pristine, submitting }) => (
  <FormGroup>
    <FormControl type="text" placeholder="네, 작업장입니다|" {...input}/>
    <Button className="btn-send" type="submit" disabled={pristine || submitting}>
      <i className="fa fa-paper-plane" aria-hidden="true"/>
    </Button>
  </FormGroup>
);

class SendMessageFormView extends Component {

  componentWillMount() {
    const { typingMessage, pristine } = this.props;
    const isTyping = typingMessage(!pristine);

    return isTyping;
  }

  render() {
    const { handleSubmit, submitting, className, isTyping, pristine } = this.props;

    // notify that user is typing
    // typingMessage(!pristine);

    return (
      <Form onSubmit={handleSubmit} className={className}>
        <Field name="message" component={ InputMessageBoxView } {...{ pristine, submitting, isTyping }}/>
      </Form>
    );
  }
}

const SendMessageForm = reduxForm({
  form: 'SendMessageForm',
})(SendMessageFormView);

export default SendMessageForm;