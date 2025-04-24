const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

require("dotenv").config();

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

module.exports = router;
