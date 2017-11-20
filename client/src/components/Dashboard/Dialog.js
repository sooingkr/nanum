import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const Dialog = ({ show, onClose, container, children }) => (
  <Modal show={show} onHide={onClose} container={container} dialogClassName="add-food-dialog">
    <Modal.Header closeButton/>
    <Modal.Body>
      {children}
    </Modal.Body>
  </Modal>
)

Dialog.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default Dialog;