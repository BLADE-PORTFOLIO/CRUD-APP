import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeleteItemForm = () => {
  const navigate = useNavigate();

  const item = JSON.parse(localStorage.getItem('selectedItem'));

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/items/${item.id}`)
    localStorage.removeItem('selectedItem');
    navigate('/');
  };

  const onClose = () => {
    localStorage.removeItem('selectedItem');
    navigate('/');
  };

  return (
    <Modal show={true} style={{ outline: 0 }}>
      <Modal.Header>
        <Modal.Title style={{ border: '2px solid black' }}>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ border: '2px solid black' }}>
        <p>Are you sure you want to delete the item "{item.name}"?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItemForm;