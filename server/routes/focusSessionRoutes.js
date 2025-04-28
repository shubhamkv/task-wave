const express = require("express");
const zod = require("zod");
const authMiddleware = require("../middleware/authMiddleware");
const FocusSession = require("../models/focusSessionModel");

const router = express.Router();

const sessionInput = zod.object({
  taskName: zod.string().min(1),
  taskId: zod.string().optional(),
  duration: zod.number().int().positive().min(5, "Minimum 5 minutes required"),
  startedAt: zod
    .preprocess(
      (arg) => {
        return typeof arg === "string" || arg instanceof Date
          ? new Date(arg)
          : arg;
      },
      zod.date({
        required_error: "startedAt is required",
        invalid_type_error: "Invalid date format",
      })
    )
    .refine(
      (date) => {
        // const now = new Date();
        // now.setHours(0, 0, 0, 0);

        // const startDate = new Date(date);
        // startDate.setHours(0, 0, 0, 0);

        // // console.log(now);
        // // console.log(startDate);
        // return startDate.getTime() == now.getTime();

        const now = new Date();

        const todayDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const startDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        return startDate.getTime() === todayDate.getTime();
      },
      {
        msg: "startDate must be today",
      }
    ),
  endedAt: zod
    .preprocess(
      (arg) => {
        return typeof arg === "string" || arg instanceof Date
          ? new Date(arg)
          : arg;
      },
      zod.date({
        required_error: "endedAt is required",
        invalid_type_error: "Invalid date format",
      })
    )
    .refine(
      (date) => {
        // const now = new Date();
        // now.setHours(0, 0, 0, 0);

        // const endDate = new Date(date);
        // endDate.setHours(0, 0, 0, 0);

        // return endDate >= now;

        const now = new Date();

        const todayDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const endDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        return endDate >= todayDate;
      },
      {
        msg: "endDate must be today or in the future",
      }
    ),
});

router.post("/", authMiddleware, async (req, res) => {
  const validationResult = sessionInput.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      msg: "Invalid Inputs!!",
      errors: validationResult.error.errors,
    });
  }

  const { taskId, taskName, duration, startedAt, endedAt } = req.body;

  try {
    const session = await FocusSession.create({
      userId: req.userId,
      taskId: taskId || null,
      taskName,
      startedAt,
      endedAt,
      duration,
    });

    if (session) {
      res.status(201).json({
        msg: "New session created",
        createdSession: session,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in creating session..",
    });
  }
});

module.exports = router;
