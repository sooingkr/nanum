/**
 * Created by manhvu on 10/13/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {toggleModal} from '../../utils/AppUtils';
import {AppDuck} from '../../containers/App/AppDuck';

const mapStateToProps = state => {
  const appState = state[AppDuck.storeName];
  return {
    openModalId: appState.openModalId
  }
};

export const ErrorModal = connect(mapStateToProps)(({ modalId, children, openModalId }) => (
  <Modal show={openModalId === modalId} onHide={() => toggleModal(modalId)}>
    <Modal.Header closeButton>
      <Modal.Title><span className="text-danger">Oops!</span></Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {children}
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={() => toggleModal(modalId)}>Close</Button>
    </Modal.Footer>
  </Modal>
));

ErrorModal.propTypes = {
  modalId: PropTypes.string.isRequired,
};
