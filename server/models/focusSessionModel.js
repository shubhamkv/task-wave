const mongoose = require("mongoose");

const focusSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  duration: Number,
  startedAt: Date,
  endedAt: Date,
});

const FocusSession = mongoose.model("FocusSession", focusSessionSchema);

module.exports = FocusSession;
