
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newItem = new Item({ name, description });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item' });
    }
});


router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
});


router.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item' });
    }
});

module.exports = router;