const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

require("dotenv").config();

/**
 * @swagger
 * /user/signup:
 *   post:
 *    summary: Register a new user
 *    description: SignUp / Register a new user on app
 *    tags: [User]
 *    security: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *            - name
 *          properties:
 *            username:
 *              type: string
 *              format: email
 *            password:
 *              type: string
 *              minLength: 6
 *            name:
 *              type: string
 *    responses:
 *      201:
 *        description: Successfully registered
 *      400:
 *        description: Validation failed
 *      409:
 *        description: User already exists
 *      500:
 *        description: Internal server error
 */

const signupBody = zod.object({
  username: zod.string().email().trim(),
  password: zod
    .string()
    .min(6, { msg: "Password must be at least of length 6" })
    .trim(),
  name: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      msg: "Incorrect Inputs!",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      msg: "Email already exists! Try another one...",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      username: req.body.username,
      password: hashedPassword,
      name: req.body.name,
    });

    return res.status(201).json({
      msg: "You are register successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Oops! Something went wrong.. Try Again..",
    });
  }
});

/**
 * @swagger
 * /user/signin:
 *   post:
 *    summary: Login existing user
 *    description: Login the user with their existing credentials
 *    tags: [User]
 *    security: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required: [username, password]
 *              properties:
 *                username:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  minLength: 6
 *    responses:
 *      200:
 *        description: Successfully logged in
 *      400:
 *        description: Invalid inputs / credentials
 *      500:
 *        description: Internal server error
 */

const signinBody = zod.object({
  username: zod.string().email().trim(),
  password: zod
    .string()
    .min(6, { msg: "Password must be at least of length 6" })
    .trim(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      msg: "Invalid Inputs!",
    });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid Credentials!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({
      msg: "You are successfully sign in!",
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Error while sign in! Try Again...",
      error: e.message,
    });
  }
});

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get the profile of authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/profile", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        msg: "User Profile not found !!",
      });
    }
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Something went wrong...",
    });
  }
});

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile of authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Password must be at least 6 characters long.
 *               name:
 *                 type: string
 *               focusStreak:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid inputs
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

const updateBody = zod.object({
  password: zod
    .string()
    .min(6, { msg: "Password must be at least of length 6" })
    .trim()
    .optional(),
  name: zod.string().optional(),
  focusStreak: zod.number().int().nonnegative().optional(),
});

router.put("/profile", authMiddleware, async (req, res) => {
  const validationInput = updateBody.safeParse(req.body);
  if (!validationInput.success) {
    return res.status(400).json({
      msg: "Invalid Inputs",
    });
  }

  const userId = req.userId;

  if (req.body.newPassword) {
    const inputPassword = req.body.newPassword;
    const hashedPassword = await bcrypt.hash(inputPassword, 10);
    validationInput.data.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      validationInput.data,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json({
      msg: "User profile updated",
      updatedUser,
    });
  } catch (error) {
    console.log("Error message: ", error);
    res.status(500).json({
      msg: "Something went wrong.. see console",
    });
  }
});

module.exports = router;
