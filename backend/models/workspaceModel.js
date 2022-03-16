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
    assigned_members:[
        {members:
          { member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member"
            },
          isHR: {type: Boolean,default: false},
          rateHour :{ type : Number},
          rateovertime : {type : Number}
          ,}
        }]
  },
);

module.exports = mongoose.model("Workspace", workspaceSchema);
