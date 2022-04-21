const mongoose = require("mongoose");

const userscoreSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    score_workspace: [
      {
        workspaceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workspace",
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
    score_project: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserScore", userscoreSchema);
