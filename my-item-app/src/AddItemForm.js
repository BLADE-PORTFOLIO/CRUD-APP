import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemName !== '') {
      axios.post('http://localhost:3000/items', {
        name: itemName,
        price: itemPrice
      })
      .then(response => {
        console.log('Item added successfully');
        console.log(response.data);
        setItemName('');
        setItemPrice(0);
        navigate('/');
      })
      .catch(error => {
        console.log('Error adding item: ', error);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <input 
        type="text" 
        name="itemName" 
        placeholder="Item Name" 
        value={itemName} 
        onChange={(e) => setItemName(e.target.value)} 
        style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}
      />
      <input 
        type="number" 
        name="itemPrice" 
        placeholder="Item Price" 
        value={itemPrice} 
        onChange={(e) => setItemPrice(e.target.value)} 
        style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}
      />
      <Button type="submit" style={{ margin: '10px 0' }}>Add Item</Button>
    </Form>
  );
}

export default AddItemForm;