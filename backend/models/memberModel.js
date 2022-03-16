const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a firstname"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a lastname"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    gender: {
      type: String,
      required: [true, "Please add a gender"],
      enum: ["male", "female", "other"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    address : {
      type: String
    },
    state: {
      type: String
    },
    country : {
      type : String
    },
    city : {
      type : String
    },
    zipCode : { 
      type: String
    },
    about: {
      type: String
    },
    joined_workspaces:[
      {workspace:
        { workspace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workspace"
          }
        }
      }]
  },
  {
    timestamps: true,
  },
  
);

module.exports = mongoose.model("Member", memberSchema);
