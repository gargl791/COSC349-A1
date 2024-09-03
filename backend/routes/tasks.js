const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    // Create a new task
    router.post('/', async (req, res) => {
        const { userId, title, endDate, priority } = req.body;
        try {
            const newTask = await pool.query(
                'INSERT INTO tasks (user_id, title, due_date, priority) VALUES ($1, $2, $3, $4) RETURNING *',
                [userId, title, endDate, priority]
            );
            res.json(newTask.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Server Error');
        }
    });

    // Get all tasks
    router.get('/', async (req, res) => {
        try {
            const allTasks = await pool.query('SELECT * FROM tasks');
            res.json(allTasks.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Server Error');
        }
    });

    // Get all tasks for a specific user
    router.get('/:userId', async (req, res) => {
        const { userId } = req.params;
        try {
            const userTasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
            res.json(userTasks.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Server Error');
        }
    });

    return router;
};
