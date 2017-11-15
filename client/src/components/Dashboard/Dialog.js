import React from 'react';
import { Modal } from 'react-bootstrap';

const Dialog = ({ show, onClose, children }) => (
  <Modal show={show} onHide={onClose} dialogClassName="add-food-dialog">
    <Modal.Header closeButton/>
    <Modal.Body>
      {children}
    </Modal.Body>
  </Modal>
)

export default Dialog;