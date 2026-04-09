const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory task store
// Each task: { id, title, completed, createdAt }
const tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: uuidv4(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
    const task = tasks.find((task) => task.id === req.params.id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { completed } = req.body;
    task.completed = completed;

    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
    console.log('Server running on port 5000');
});
