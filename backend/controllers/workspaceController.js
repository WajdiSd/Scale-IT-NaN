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

  const obj = {
    member: req.params.idmember,
    isHR: false,
  };

  //create workspace
  const wkspc = await Workspace.findOneAndUpdate(
    { _id: "623219d79a63206559f548ce" },
    {
      name,
      description,
      $push: { assigned_members: obj },
    },
    {
      upsert: true,
      new: true,
    }
  );

  if (wkspc) {
    res.status(201).json(wkspc);
  } else {
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
  updateWksp,
  getWorkspaces,
};
