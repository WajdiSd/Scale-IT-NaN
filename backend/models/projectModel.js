const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
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
      default: "started",
      enum: ["started", "finished", "aborted", "finished with delay"],
    },
    assigned_members: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Member",
        },
        isProjectManager: { type: Boolean, default: false },
        isTeamLeader: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
