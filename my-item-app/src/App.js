import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import AddItemForm from './AddItemForm';
import UpdateItemForm from './UpdateItemForm';
import DeleteItemForm from './DeleteItemForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [items, setItems]);

  const fetchItems = async () => {
    try 
    {
      const response = await axios.get('http://localhost:3000/items');
      setItems(response.data);
    } 
    catch (error) 
    {
      console.log('Error fetching items: ', error);
    }
  };

  const handleItemClick = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    
    localStorage.setItem('selectedItem', JSON.stringify(item));
  };

  const tableOptions = {
    border: '4px solid black',
    striped: true,
    hover: true,
  };

  return(
    <Router>
      <Routes>
        <Route path="/AddItemForm" element={<AddItemForm/>} />
        <Route path="/UpdateItemForm/" element={<UpdateItemForm/>} />
        <Route path="/DeleteItemForm/:id" element={<DeleteItemForm/>} /> {/* item={selectedItem} */}
        <Route
          path="/"
          element={
            <Container>
              <h1>Items List</h1>
              <Table {...tableOptions}>
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      {/* <td>{item.id}</td> */}
                      <td>{item.name}</td>
                      <td>{Math.round(item.price * 100) / 100}</td>
                      <td>
                        <Link to={'/UpdateItemForm/'} style={{ textDecoration: 'none' }}>
                          <Button onClick={() => handleItemClick(item.id)} style={{ backgroundColor: 'black', color: 'white' }}>Update</Button>
                        </Link>
                        <Link to={`/DeleteItemForm/${item.id}`} style={{ textDecoration: 'none' }}>
                          <Button onClick={() => handleItemClick(item.id)} style={{ backgroundColor: 'black', color: 'white' }}>Delete</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Link to="/AddItemForm" style={{ textDecoration: 'none' }}>
                <Button style={{ backgroundColor: 'black', color: 'white' }}>Add Item</Button>
              </Link>
              {/* {selectedItem && <UpdateItemForm item={selectedItem} onUpdate={handleUpdate} />}
              {selectedDeleteItem && (
                <DeleteItemForm
                  item={selectedDeleteItem}
                  onDelete={handleDeleteItem}
                  onClose={() => setSelectedDeleteItem(null)}
                />
              )} */}
            </Container>
          }
        />
      </Routes>
    </Router>
)};

export default App;