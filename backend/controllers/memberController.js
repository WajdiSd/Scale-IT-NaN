const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");

// @desc Register new member
// @route post /api/members
// @access public
const registerMember = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    rateOvertime,
    rateHour,
    isHR,
    phone,
    gender,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !rateOvertime ||
    !rateHour ||
    !isHR ||
    !phone ||
    !gender
  ) {
    res.status(400);
    throw new Error("please add all fields");
  }

  //check if member exists with email
  const memberExist = await Member.findOne({ email });

  if (memberExist) {
    res.status(400);
    throw new Error("member already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create member
  const member = await Member.create({
    firstName,
    lastName,
    email,
    rateOvertime,
    rateHour,
    isHR,
    phone,
    gender,
    password: hashedPassword,
  });

  if (member) {
    res.status(201).json({
      _id: member._id,
      firstName: member.firstName,
      email: member.email,
      token: generateToken(member._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid member data");
  }
});

// @desc Authenticate a member
// @route post /api/members/login
// @access public
const loginMember = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for member email
  const member = await Member.findOne({ email });

  if (member && (await bcrypt.compare(password, member.password))) {
    res.json({
      _id: member.id,
      firstName: member.firstName,
      email: member.email,
      token: generateToken(member._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get member data
// @route get /api/members/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const { _id, firstName, email } = await Member.findById(req.member.id);

  res.status(200).json({
    id: _id,
    firstName,
    email,
  });
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerMember,
  loginMember,
  getMe,
};
