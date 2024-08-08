import { Modal, Button } from 'react-bootstrap';

export default function ConfirmationSingle({ show, onConfirmSingle, onCancelSingle, taskName, taskId}){
    return (
      <Modal show={show} onHide={onCancelSingle}>
        <Modal.Header className='d-flex flex-column lexPurple'>
          <Modal.Title className='text-white'>Confirm Delete</Modal.Title>
          <Modal.Body className='text-white'>Are you sure you want to delete {taskName}</Modal.Body>
          <Modal.Footer>
          <Button className='lexGray border-0 edit-button' onClick={onCancelSingle}>
            Cancel
          </Button>
          <Button className='lexOrange border-0 edit-button' onClick={() => onConfirmSingle(taskId, taskName)}>
            Yes
          </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    );
  };
  