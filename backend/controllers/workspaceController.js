const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Workspace = require("../models/workspaceModel");
const Member = require("../models/memberModel");

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc add new workspace
// @route post /api/workspace
// @access public
const addWorkspace = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    archive,
  } = req.body;
  if (
    !name ||
    !description ||
    !archive 
  ) {
    res.status(400);
    throw new Error("please add all fields");
  }

  //check if member exists with email
  const workspaceExist = await Workspace.findOne({ name });

  if (workspaceExist) {
    res.status(400);
    throw new Error("workspace already exists");
  }
  //create workspace
  const wkspc = await Workspace.create({
    name,
    description,
    archive
  });

  if (wkspc) {
    res.status(201).json({
      _id: wkspc._id,
      name: wkspc.name,
      description: wkspc.description,
      token: generateToken(wkspc._id),
    });
  } 
  else {
    res.status(400);
    throw new Error("invalid workspace data");
  }
});


// Update workspace
// @desc update workspace 
// @route post /api/workspace/update/:id
// @access public
const updateWksp = asyncHandler(async (req, res) => {
  //
const entries = Object.keys(req.body)
const updates = {}

// constructing dynamic query : get the informations entered in BODY
for (let i = 0; i < entries.length; i++) {
  updates[entries[i]] = Object.values(req.body)[i]
  }
// update members fields according to the BODY
Workspace.updateOne({_id: req.params.id} , {$set: updates} ,
function (err , success) {
  if (err) throw (err);
    else {
    res.send({msg: "update success"})
    ;}})
});  

// Update workspace
// @desc update workspace 
// @route post /api/workspace/update/:id
// @access public
const inviteOneMember = asyncHandler(async (req, res) => {
  memberEmail = req.body.email;
  memberIsHR = req.body.memberIsHR;
  memberRateHour = req.body.memberRateHour;
  memberRateOverTime = req.body.memberRateOverTime;
  let workspace = await Workspace.findOne({_id: req.params.id});
  let member = await Member.findOne({email: memberEmail});
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  } else if (!member) {
    res.status(404);
    throw new Error("member not found");
  }

  member.isHR = memberIsHR;
  member.rateHour = memberRateHour;
  member.rateOverTime = memberRateOverTime;

  // await Workspace.updateOne({_id : workspace._id},
  //   {$push : {
  //     "assigned_members.member" : member
  //   },
  //   "assigned_members.isHR" : memberIsHR,
  
  // }
  //   )  


  
  //await Workspace.updateOne({_id : workspace._id},$push:{assigned_members: {member: member._id, isHR: memberIsHR, rateHour: memberRateHour, rateOverTime: memberRateOverTime}})
    console.log("------");
    console.log(workspace.assigned_members.member);

  res.send({
    status: 200,
    message: "member invited to workspace successfully",

  })
})
module.exports = {
  addWorkspace,
  updateWksp,
  inviteOneMember
};
