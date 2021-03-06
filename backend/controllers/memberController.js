const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const transporter = require("../config/nodemailer");

//Recover
var code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
var codeCheck = false;

// @desc Register new member
// @route post /api/members
// @access public
const registerMember = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, gender } = req.body;

  if (!firstName || !lastName || !email || !password || !phone || !gender) {
    res.status(400);
    throw new Error("please add all fields");
  }

  //check if member exists with email
  const memberExist = await Member.findOne({
    email,
  });

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
    phone,
    gender,
    password: hashedPassword,
  });
  //auth/confirm
  if (member) {
    var mailOptions = {
      from: '"Scale IT" <no-reply@scaleitbynan@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome!",
      template: "email", // the name of the template file i.e email.handlebars
      context: {
        link: process.env.FRONTEND_BASE_URL + "auth/confirm/" + member._id, // replace {{link}}
      },
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400);
        throw new Error(error);
      } else {
        res.status(201).json({
          _id: member._id,
          firstName: member.firstName,
          email: member.email,
          token: generateToken(member._id),
        });
      }
    });
  } else {
    res.status(400);
    throw new Error("invalid member data");
  }
});

// @desc Register new member
// @route post /api/members
// @access public
const resendEmail = asyncHandler(async (req, res) => {
  console.log("resending");
  const member = await Member.findOne({
    _id: req.params.id,
  });
  var mailOptions = {
    from: '"Scale IT" <no-reply@scaleitbynan@gmail.com>', // sender address
    to: member.email, // list of receivers
    subject: "Welcome!",
    template: "email", // the name of the template file i.e email.handlebars
    context: {
      link: process.env.FRONTEND_BASE_URL + "auth/confirm/" + req.params.id, // replace {{link}}
    },
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400);
      throw new Error(error);
    } else {
      res.status(201).json({
        message: "Message sent",
      });
    }
  });
});

// @desc Verify member
// @route post /api/members/verify/:id
// @access public
const verifyMember = asyncHandler(async (req, res) => {
  Member.exists(
    {
      _id: req.params.id,
    },
    (err, member) => {
      if (member) {
        Member.findById(
          {
            _id: req.params.id,
          },
          (err, member) => {
            if (err) {
              res.status(400);
              res.send("invalid member id");
            }
            if (member.isValidated) {
              res.status(300).json({
                message: "member is already validated",
              });
            } else {
              const filter = {
                _id: member._id,
              };

              // create a document that sets the plot of the movie
              const updateDoc = {
                $set: {
                  isValidated: true,
                },
              };
              async function updateUser() {
                return await Member.updateOne(filter, updateDoc);
              }
              const result = updateUser();
              if (result) {
                res.status(201).json({
                  message: "Member account confirmed.",
                });
              } else {
                res.status(400);
                throw new Error("invalid member data");
              }
            }
          }
        );
      } else if (err) {
        res.status(400);
        res.send("invalid member id");
      }
    }
  );
});

// @desc Authenticate a member
// @route post /api/members/login
// @access public
const loginMember = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for member email
  const member = await Member.findOne({
    email,
  });

  if (member && (await bcrypt.compare(password, member.password))) {
    if (member.isDeleted) {
      res.status(400);
      throw new Error("Account has been deleted");
    }
    if (member.isValidated) {
      res.status(200);
      res.json({
        _id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone,
        address: member.address,
        city: member.city,
        state: member.state,
        zip: member.zip,
        about: member.about,
        token: generateToken(member._id),
      });
    } else {
      res.status(400);
      //throw new Error();
      res.json({
        _id: member.id,
        message: "Account not verified",
      });
    }
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
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// Forget password
// @desc Recover password via email
// @route post /api/members/recoverPwdViaMail
// @access public
const recoverPwdViaMail = asyncHandler(async (req, res) => {
  var verifCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  code = verifCode;
  const { email } = req.body;
  const member = await Member.findOne({ email });
  //Declaration des variables, config mail
  var nodemailer = require("nodemailer");
  //Coordonnees pour l envoi du mail

  var mailOptions = {
    from: "scaleitbynan@gmail.com",
    to: member.email,
    subject: "Reset your SCALE IT password",
    html:
      "<h1>Hello Scale IT User!</h1> <p>Hello " +
      member.firstName +
      "</p> <p> This is your code to reset your password :" +
      code +
      "</p> <p> Thank you for choosing SCALE IT!</p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
  res.status(200);
});

// Forget password
// @desc Recover password via SMS : receive code via SMS
// @route post /api/members/recoverPwdViaSms
// @access public
const recoverPwdViaSms = asyncHandler(async (req, res) => {
  var verifCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  code = verifCode;
  const { email } = req.body;
  const member = await Member.findOne({ email });

  //Declaration des variables, config SMS
  const Vonage = require("@vonage/server-sdk");
  const vonage = new Vonage({
    apiKey: "34e34089",
    apiSecret: "BgEEVv60NIjzoVqH",
  });
  //Coordonnees pour envoyer l SMS
  const from = "Scale IT";
  const to = member.phone;
  /*Sens SMS :
  const text = "Use code : " + code + " , to reset password!";
  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });*/
  res.status(200).json(code, codeCheck, from, to);
});

// verify code
// @desc Recover password via email
// @route post /api/members/verifyCode
// @access public
const verifyCode = asyncHandler(async (req, res) => {
  var verifcode = req.params.verifcode;
  if (verifcode != null) {
    if (verifcode == code) {
      codeCheck = true;
    } else codeCheck = false;
  }
  res.status(200).json({
    verifcode,
    code,
    codeCheck,
  });
});

// modif password
// @desc Recover password
// @route post /api/members/updatepwd/:email
// @access public
const updatepwd = asyncHandler(async (req, res) => {
  //Filter by email, get password
  if (codeCheck) {
    const filter = { email: req.params.email };
    const { newPassword } = req.body;
    //hash password and update it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const update = { password: hashedPassword };

    //try without hashing password
    //const update = { password: req.body.password };

    let member = await Member.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json("Password successfully changed.");
  } else {
    res.status(200).json({
      code,
      codeCheck,
    });
  }
});

// modif password
// @desc Recover password
// @route post /api/members/updatepwd/:email
// @access public
const updateUserPassword = asyncHandler(async (req, res) => {
  //Filter by email, get password
  const filter = { email: req.params.email };

  const user = await Member.findOne(filter);
  const { oldPassword, newPassword } = req.body;
  if (await bcrypt.compare(oldPassword, user.password)) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const update = { password: hashedPassword };

    let member = await Member.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (member) {
      res.status(200).json("Password successfully changed.");
    } else {
      res.status(400);
      throw new Error("userID does not match");
    }
  } else {
    res.status(400);
    throw new Error("Password does not match!");
  }
});

// Check if user exists
// @desc Check if user exists
// @route post /api/members/user/:email
// @access public
const checkIfUserExistsByEmail = asyncHandler(async (req, res) => {
  const filter = { email: req.params.email };

  const user = await Member.findOne(filter);

  if (user) {
    res.status(200).json(true);
  } else {
    res.status(400);
    throw new Error(`User ${req.params.email} does not exist`);
  }
});

// Delete account
// @desc delete account == set isDeleted to false
// @route put /api/members/deleteaccount/:iduser
// @access public
const deleteUser = asyncHandler(async (req, res) => {
  // const memberToDelete = await Member.findById({ _id: req.params.iduser });
  // console.log(memberToDelete);
  // if (memberToDelete == null) {
  //   res.status(400);
  //   throw new Error("member id not valid");
  // }
  //Filter by email, get password
  const filter = { _id: req.params.iduser };
  const update = { isDeleted: true };

  let member = await Member.findOneAndUpdate(filter, update, {
    new: true,
  })
    .then((member) => res.status(200).json(member))
    .catch((err) => {
      res.status(400);
      throw new Error("invalid member id");
      // res.status(200).json({
      //   id: member.id,
      //   isDeleted: member.isDeleted,
      //   email: member.email,
      // });
    });
});

// Update account
// @desc update account
// @route post /api/members/updateaccount/:iduser
// @access public
const updateUser = asyncHandler(async (req, res) => {
  //
  const entries = Object.keys(req.body);
  const updates = {};
  const data = req.body;
  // constructing dynamic query : get the informations entered in BODY
  // for (let i = 0; i < entries.length; i++) {
  //   updates[entries[i]] = Object.values(data)[i];
  // }

  // update members fields according to the BODY
  const filter = { _id: req.params.iduser };
  let member = await Member.findOneAndUpdate(filter, data, {
    new: true,
  }).then((user, err) => {
    if (err) {
      res.status(400);
      throw new Error("update failed");
    }
    res.status(200).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      city: user.city,
      country: user.country,
      zipCode: user.zipCode,
      about: user.about,
      address: user.address,
      state: user.state,
    });
  });
});

const getConnectedUser = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  res.status(200).json({
    sender: member._id,
    message: member.firstName,
  });
});

module.exports = {
  registerMember,
  loginMember,
  verifyMember,
  getMe,
  recoverPwdViaMail,
  recoverPwdViaSms,
  verifyCode,
  updatepwd,
  deleteUser,
  updateUser,
  updateUserPassword,
  resendEmail,
  checkIfUserExistsByEmail,
  getConnectedUser,
};
