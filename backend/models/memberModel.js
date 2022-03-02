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
    isHR: {
      type: Boolean,
      required: [true],
    },
    rateHour: {
      type: Number,
      required: [true, "Please add a rate of the hour"],
    },
    rateOvertime: {
      type: Number,
      required: [true, "Please add a rate of the overtime"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);
