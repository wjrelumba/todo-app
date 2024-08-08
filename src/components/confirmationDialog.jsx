import { Modal, Button } from 'react-bootstrap';

export default function ConfirmationDialog({ show, onConfirm, onCancel }){
    return (
      <Modal show={show} onHide={onCancel}>
        <Modal.Header className='d-flex flex-column lexPurple'>
          <Modal.Title className='text-white'>Confirm Delete</Modal.Title>
          <Modal.Body className='text-white'>Are you sure you want to delete all tasks?</Modal.Body>
          <Modal.Footer>
          <Button className='lexGray border-0 edit-button' onClick={onCancel}>
            Cancel
          </Button>
          <Button className='lexOrange border-0 edit-button' onClick={onConfirm}>
            Yes
          </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    );
  };
  