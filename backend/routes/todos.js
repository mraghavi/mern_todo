import express from 'express';
import Todo from '../models/Todo.js';  // Assuming your Todo model is defined correctly

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch todos' });
    }
});

// POST a new todo
router.post('/', async (req, res) => {
    const { text } = req.body; // Expect text field

    try {
        const newTodo = new Todo({ text });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create a new todo', error: error.message });
    }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete todo' });
    }
});

// PUT (Update) a todo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body; // Expect text field

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { text },
            { new: true }  // Returns the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update todo' });
    }
});

export default router;
