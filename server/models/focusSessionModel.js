const mongoose = require("mongoose");

const focusSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: false,
  },
  taskName: {
    type: String,
    required: true,
  },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date, required: true },
  completed: { type: Boolean, default: true },
});

const FocusSession = mongoose.model("FocusSession", focusSessionSchema);

module.exports = FocusSession;
