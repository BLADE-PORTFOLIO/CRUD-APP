import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateItemForm = () => {
  const obj = localStorage.getItem('selectedItem');
  const item = JSON.parse(obj);

  const [id, setId] = useState(item.id);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUpdate = () => {
    const updatedItem = {
      id: id,
      name: name,
      price: price,
    };

    axios.put(`http://localhost:3000/items/${updatedItem.id}`, updatedItem)

    localStorage.clear();

    navigate('/');
  };

  return (
    <div>
      <h2>Update Item</h2>
      { 1 && ( 
      <>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
        <br />
        <label>Price:</label>
        <input type="text" value={Math.round(price*100)/100 } onChange={handlePriceChange} />
        <br />
        <Button onClick={handleUpdate}>Update</Button>
        </> 
    )}
    </div>
  );
};

export default UpdateItemForm;