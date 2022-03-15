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
    }
   
  },
);

module.exports = mongoose.model("Workspace", workspaceSchema);
