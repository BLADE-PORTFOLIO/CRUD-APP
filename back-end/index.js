const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3005']
  }));

let items = [
    { id: uuidv4(), name: 'Bottle', price: Math.random() * ( ( Math.random() + 1 ) * 50)},
    { id: uuidv4(), name: 'Belt', price: Math.random() * ( ( Math.random() + 1 ) * 50)},
    { id: uuidv4(), name: 'Bag', price: Math.random() * ( ( Math.random() + 1 ) * 50)},
];

app.head('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
  
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1)
    {
      const item = items[index];
      res.set('Item-ID', item.id); // Set a custom header
      res.set('Item-Name', item.name);
      res.set('Item-Price', item.price);
      res.sendStatus(200);
    } 
    else 
    {
      return res.status(404).json({ message: 'Item not found' });
    }
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post(
    '/items',
    [  
        body('name')
        .notEmpty().withMessage('Name is Required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only alphabetic characters')
        .escape().withMessage('Name cannot contain special characters'),
        body('price')
        .notEmpty().withMessage('Price must be given')
        .isFloat({ min: 1 }).withMessage('Price must be a positive number')
        .escape().withMessage('Price must not contain special characters'),
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
        return res.status(400).json({ errors: errors.array() });
    }
    else
    {
        const newItem = req.body;
        const Item = { 'id': uuidv4(), ...newItem};

        if (items.some(item => item.name === Item.name)) 
        {
            return res.status(400).json({ message: 'an item with the same name already exists' });
        }
        else
        {
            Item.price = parseFloat(Item.price);
            items.push(Item);
            return res.json(Item);
        }
    }
});

app.put('/items/:id', (req, res) => {
    let itemId = req.params.id;
    const updatedItem = req.body;
    
    const index = items.findIndex(item => item.id == itemId);
    if (index !== -1)
    {
        items[index] = {id: itemId, ...updatedItem };
        return res.json(items[index]);
    } 
    else 
    {
        return res.status(404).json({ message: 'Item not found' });
    }
});

app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
  
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) 
    {
        const deletedItem = items.splice(index, 1);
        res.json(deletedItem);
    } 
    else 
    {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.patch('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedFields = req.body;

    const index = items.findIndex(item => item.id === itemId);
    if (index!== -1)
    {
        items[index] = {...items[index], ...updatedFields };
        res.json(items[index]);
    }
    else
    {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.options('/items/', (req, res) => {
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});