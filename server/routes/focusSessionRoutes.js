const express = require("express");
const zod = require("zod");
const authMiddleware = require("../middleware/authMiddleware");
const FocusSession = require("../models/focusSessionModel");

const router = express.Router();

const sessionInput = zod.object({
  taskName: zod.string().min(1),
  taskId: zod.string().optional(),
  duration: zod.number().int().positive().min(5, "Minimum 5 minutes required"),
  status: zod.enum(["Success", "Interrupted"]).optional(),
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
        message: "endDate must be today or in the future",
      }
    ),
});

/**
 * @swagger
 * /focus-session:
 *   get:
 *     summary: Get focus sessions
 *     description: Get all focus sessions for the authenticated user
 *     tags: [Focus Session]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of focus sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FocusSession'
 *       404:
 *         description: No sessions found
 *       500:
 *         description: Internal server error
 */

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const sessions = await FocusSession.find({ userId: userId });
    if (!sessions) {
      return res.status(404).json({
        msg: "Focus Session not found !!",
      });
    }
    res.json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong...",
    });
  }
});

/**
 * @swagger
 * /focus-session:
 *   post:
 *     summary: Create a new focus session
 *     description: Create a new session for authenticated user
 *     tags: [Focus Session]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               taskName:
 *                 type: string
 *               duration:
 *                 type: integer
 *                 minimum: 5
 *               startedAt:
 *                 type: string
 *                 format: date
 *               endedAt:
 *                 type: string
 *                 format: date
 *             required:
 *               - taskName
 *               - duration
 *               - startedAt
 *               - endedAt
 *     responses:
 *       201:
 *         description: Focus session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FocusSession'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /focus-session/{id}:
 *   put:
 *     summary: Update a focus session
 *     description: Update an existing focus session of user
 *     tags: [Focus Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the session to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Success, Interrupted]
 *     responses:
 *       200:
 *         description: Session updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FocusSession'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */

router.put("/:id", authMiddleware, async (req, res) => {
  const inputValidation = sessionInput.partial().safeParse(req.body);
  if (!inputValidation.success) {
    return res.status(400).json({
      error: inputValidation.error.errors,
      msg: "Invalid Inputs!!",
    });
  }

  try {
    const updateSession = await FocusSession.findOneAndUpdate(
      { _id: req.params.id },
      inputValidation.data,
      { new: true }
    );

    if (!updateSession) {
      return res.status(404).json({
        msg: "Session not found!",
      });
    }

    res.json({
      msg: "Session updated",
      updatedSession: updateSession,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
});

/**
 * @swagger
 * /focus-session/{id}:
 *   delete:
 *     summary: Delete a focus session
 *     description: Delete an existing focus session of user
 *     tags: [Focus Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the session to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FocusSession'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleteSession = await FocusSession.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deleteSession) {
      return res.status(404).json({
        msg: "Session not found!",
      });
    }

    res.json({
      msg: "Session deleted successfully !!",
      deletedSession: deleteSession,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
});

module.exports = router;
