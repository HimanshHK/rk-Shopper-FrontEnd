import React from 'react';
import { Button, Modal } from 'react-bootstrap';
// import LoginForm from './LoginForm';
import LoginForm from './LoginForm';

export default function Login() {
  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <>
      <div onClick={handleShow}>
      SignIn
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body>
        <LoginForm/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
