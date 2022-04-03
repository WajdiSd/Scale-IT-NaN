const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    startDate: {
      type: Date,
      required: [true, "Please add a start date"],
    },
    expectedEndDate: {
      type: Date,
      required: [true, "Please add an expected end date"],
    },
    endDate: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "to_do",
      enum: ["to_do", "doing", "done", "review"],
    },
    priority: {
      type: String,
      default: "Low",
      enum: ["Low", "Medium", "High"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    members:[
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Member",
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
