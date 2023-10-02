import React from 'react';
import { Button, Modal } from 'react-bootstrap';
// import LoginForm from './LoginForm';
import AddProductForm from './AddProductForm';

export default function AddProduct() {
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
      AddProduct
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body>
        <AddProductForm/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}