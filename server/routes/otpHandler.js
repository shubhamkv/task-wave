const express = require("express");
const crypto = require("crypto");
const { redisClient } = require("../config/redisDB");
const { Resend } = require("resend");
const generateOTP = require("../utils/generateOTP");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send", authMiddleware, async (req, res) => {
  const { username } = req.body;
  const otp = generateOTP();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  try {
    const dbres = await redisClient.setEx(username, 600, hashedOtp);
    const emailResponse = await resend.emails.send({
      from: process.env.EMAIL,
      to: username,
      subject: "Your OTP code",
      html: `<p>Your OTP code is <strong>${otp}</strong>. It expires in 10 minutes</p>`,
    });
    //console.log(emailResponse);
    //console.log(dbres);
    if (!emailResponse.data) {
      console.log(emailResponse.error);
      return res.status(400).json({
        msg: "Oops! Unable to send email",
      });
    }

    res.json({
      msg: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP: ", error);
    res.status(500).json({
      msg: "Failed to send OTP!",
    });
  }
});

router.post("/verify", authMiddleware, async (req, res) => {
  const { username, otp } = req.body;

  try {
    const storedOtp = await redisClient.get(username);
    if (!storedOtp) {
      return res.status(400).json({
        msg: "OTP expired or not found!",
      });
    }
    console;
    const hashedOtpInput = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    if (hashedOtpInput !== storedOtp) {
      return res.status(400).json({
        msg: "Invalid OTP",
      });
    }

    await redisClient.del(username);
    res.json({
      msg: "OTP verified successfully!!",
    });
  } catch (error) {
    console.error("Error verifying OTP : ", error);
    res.status(500).json({
      msg: "Failed to verify OTP",
    });
  }
});

module.exports = router;
