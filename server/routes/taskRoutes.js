const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/taskModel");
const zod = require("zod");

const router = express.Router();

const taskInput = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
  priority: zod.enum(["low", "medium", "high"]),
  dueDate: zod
    .preprocess(
      (arg) => {
        return typeof arg === "string" || arg instanceof Date
          ? new Date(arg)
          : arg;
      },
      zod.date({
        required_error: "dueDate is required",
        invalid_type_error: "Invalid date format",
      })
    )
    .refine((date) => date > new Date(), {
      msg: "dueDate must be in the future",
    }),
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      tasks: tasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error while fetching your tasks!",
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const result = taskInput.safeParse(req.body);
  //console.log(result.error);
  if (!result.success) {
    return res.status(400).json({
      msg: "Invalid Inputs!!",
    });
  }

  const { title, description, dueDate, priority } = req.body;

  try {
    const newTask = await Task.create({
      userId: req.userId,
      title,
      description,
      dueDate,
      priority,
    });
    res.status(201).json({
      msg: "New task created",
      createdTask: newTask,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in creating task..",
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const result = taskInput.partial().safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      msg: "Invalid inputs!",
    });
  }

  const taskId = req.params.id;

  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: taskId },
      result.data,
      { new: true }
    );

    //console.log(updateTask);
    if (!updateTask) {
      return res.status(404).json({
        msg: "Task not found",
      });
    }

    res.json({
      msg: "Task updated",
      updatedTask: updateTask,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete({
      _id: req.params.id,
    });

    //console.log(deleteTask);
    if (!deleteTask) {
      return res.status(404).json({
        msg: "Task not found!",
      });
    }

    res.json({
      msg: "Task deleted successfully !!",
      deletedTask: deleteTask,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
});

module.exports = router;
