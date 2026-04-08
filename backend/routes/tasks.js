const express = require('express');
const protect = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = new Task({ ...req.body, user: req.user._id });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Task not found' });
  }
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Task not found' });
  }
  await task.deleteOne();
  res.json({ message: 'Task deleted' });
});

module.exports = router;