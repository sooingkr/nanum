import React from 'react';
import { 
  Modal,
  Button,
} from 'react-bootstrap';

const Dialog = ({ show, onClose, children }) => (
  <div className="dialog">
    <Modal show={show} onHide={onClose} >
      <Modal.Header closeButton>
        <Modal.Title>Add new food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
)

export default Dialog;