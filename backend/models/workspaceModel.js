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
    archive: {
      type: Boolean,
      required: [true],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
      }
    ]
   
  },
);

module.exports = mongoose.model("Workspace", workspaceSchema);
