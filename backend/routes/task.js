const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/user");
const Task = require("../models/task");
const router = express.Router();

router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const taskData = {
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
      owner: req.user.id,
    };

    const newTask = new Task(taskData);
    await newTask.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { tasks: newTask._id },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating tasks:", error);
    res.status(500).json({ message: "Error creating tasks", error: error.message });
  }
});

router.get("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Task details", error });
  }
});

router.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating Task", error });
  }
});

router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = router;