const asyncHandler = require("express-async-handler");
const Workspace = require("../models/workspaceModel");
const Member = require("../models/memberModel");

// @desc Get goals
// @route get /api/workspace
// @access private
const getWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({
    "assigned_members.member": req.params.id,
  });
  res.status(200).json(workspaces);
});

// @desc add new workspace
// @route post /api/workspace
// @access public
const addWorkspace = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error("please add all fields");
  }

  //check if workspace exists with name
  // const workspaceExist = await Workspace.findOne({ name });

  // if (workspaceExist) {
  //   res.status(400);
  //   throw new Error("workspace already exists");
  // }

  const invitedMember = {
    member: req.params.idmember,
    isHR: true,
  };

  //create workspace
  const workspace = await Workspace.findOneAndUpdate(
    {},
    {
      name,
      description,
      $push: { assigned_members: invitedMember },
    },
    {
      upsert: true,
      new: true,
    }
  );

  if (workspace) {
    res.status(201).json(workspace);
  } else {
    res.status(400);
    throw new Error("invalid workspace data");
  }
});

// @desc add new workspace
// @route put /api/workspace/:iduser/:idworkspace
// @access public
const removeMemberFromWorkspace = asyncHandler(async (req, res) => {
  //get workspace and remove member
  const workspace = await Workspace.findOneAndUpdate(
    { _id: req.params.idworkspace },
    {
      $pull: { assigned_members: { member: req.params.idmember } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  console.log(workspace);

  if (workspace) {
    res.status(200).json(workspace);
  } else {
    res.status(400).json({
      message: "couldn't remove member from workspace !",
    });
  }
});

// Update workspace
// @desc update workspace
// @route post /api/workspace/update/:id
// @access public
const updateWorkspace = asyncHandler(async (req, res) => {
  //
  const entries = Object.keys(req.body);
  const updates = {};

  // constructing dynamic query : get the informations entered in BODY
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  // update members fields according to the BODY
  Workspace.updateOne(
    { _id: req.params.id },
    { $set: updates },
    function (err, success) {
      if (err) throw err;
      else {
        res.send({ msg: "update success" });
      }
    }
  );
});

module.exports = {
  addWorkspace,
  updateWorkspace,
  getWorkspaces,
  removeMemberFromWorkspace,
};
