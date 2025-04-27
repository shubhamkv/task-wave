const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/taskModel");
const zod = require("zod");

const router = express.Router();

const taskInput = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
  priority: zod.enum(["low", "medium", "high"]),
  completed: zod.boolean().optional(),
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
    .refine(
      (date) => {
        const now = new Date();

        const todayDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const taskDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        return taskDate >= todayDate;
      },
      {
        msg: "dueDate must be today or in the future",
      }
    ),
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { status, priority, createdAt, dueDate } = req.query;
    const query = { userId: req.userId };

    if (status) {
      if (status === "completed") query.completed = true;
      else if (status === "pending") {
        query.completed = false;
        query.dueDate = { $gte: new Date() };
      } else if (status === "missed") {
        const today = new Date();
        query.dueDate = { $lt: today };
        query.completed = false;
      }
    }

    if (priority) {
      query.priority = priority;
    }

    if (createdAt) {
      const date = new Date(createdAt);
      query.createdAt = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lte: new Date(date.setHours(23, 59, 59, 999)),
      };
    }

    if (dueDate) {
      const date = new Date(dueDate);
      query.dueDate = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lte: new Date(date.setHours(23, 59, 59, 999)),
      };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

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

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const allTasks = await Task.find({ userId });

    const now = new Date();

    const stats = {
      total: allTasks.length,
      completed: 0,
      pending: 0,
      missed: 0,
    };

    allTasks.map((task) => {
      if (task.completed == true) stats.completed += 1;
      else {
        const todayDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const taskDate = new Date(
          task.dueDate.getFullYear(),
          task.dueDate.getMonth(),
          task.dueDate.getDate()
        );
        if (todayDate > taskDate) stats.missed += 1;
        else stats.pending += 1;
      }
    });

    res.json(stats);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Failed to fetch task stats",
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
