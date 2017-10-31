/**
 * Created by manhvu on 6/16/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';

export class FieldGroupView extends Component {

  static propTypes = {
    label: PropTypes.string,
    labelSm: PropTypes.number,
  };

  render() {
    const { label, labelSm = 4, input, meta: { error, touched }, type, placeholder } = this.props;
    const hasError = (touched && error);

    return (
      <FormGroup className = {`${hasError ? 'has-error' : ''}`}>
        {
          label && <Col componentClass={ControlLabel} sm={labelSm}>{label}</Col>
        }
        <Col sm={12 - labelSm}>
          <input {...{ ...input, type, placeholder }} className="form-control" />
          {
            hasError &&
            <HelpBlock>{error}</HelpBlock>
          }
        </Col>
      </FormGroup>
    );
  }

}
