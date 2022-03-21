const mongoose = require("mongoose");

const workspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    assigned_members: [
      {
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Member",
        },
        isHR: { type: Boolean, default: false },
        isProjectManager: { type: Boolean, default: false },
        rateHour: { type: Number, default: 0 },
        rateOvertime: { type: Number, default: 0 },
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workspace", workspaceSchema);
