import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import HelpForm from './HelpForm';

export default function Help() {
  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <>
        <div onClick={handleShow} style={{paddingBottom:"0px",marginBottom:"0px"}}>
        Help
        </div>

        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Body>
            <HelpForm/>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
      
    </>
  );
}