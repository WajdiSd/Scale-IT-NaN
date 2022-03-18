const asyncHandler = require("express-async-handler");
const Workspace = require("../models/workspaceModel");
const Member = require("../models/memberModel");

// @desc Get workspaces by member
// @route get /api/workspace
// @access private
const getWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({
    "assigned_members.member": req.params.idmember,
    isDeleted: false,
  });
  res.status(200).json(workspaces);
});

// @desc Get workspace by id
// @route get /api/workspace
// @access private
const getWorkspaceById = asyncHandler(async (req, res) => {
  Workspace.exists(
    {
      _id: req.params.id,
    },
    (err, workspace) => {
      if (workspace) {
        Workspace.findById(
          {
            _id: req.params.id,
          },
          (err, workspace) => {
            if (err) {
              res.status(400);
              res.send("invalid workspace id");
            }
            res.status(200);
            res.json(workspace);
          }
        );
      } else if (err) {
        res.status(400);
        res.send("invalid workspace id");
      }
    }
  );
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
  const workspaceExist = await Workspace.findOne({ name });

  if (workspaceExist) {
    res.status(400);
    throw new Error("workspace already exists");
  }
  const invitedMember = {
    member: req.params.idmember,
    isHR: true,
  };

  const createdworkspace = await Workspace.create({
    name,
    description,
  });
  //create workspace
  const workspace = await Workspace.findOneAndUpdate(
    { _id: createdworkspace._id },
    {
      $push: { assigned_members: invitedMember },
    },
    { upsert: true, new: true }
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
  //verif member who wants to remove is member and HR
  var verif = false;
  const workspace = await Workspace.findById(req.params.idworkspace);
  if (!workspace) {
    res.status(400);
    throw new Error("invalid workspace id");
  } else {
    for (let i = 0; i < workspace.assigned_members.length; i++) {
      if (
        workspace.assigned_members[i].member == req.params.idhr &&
        workspace.assigned_members[i].isHR == true
      )
        verif = true;
    }
    if (verif) {
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
    } else {
      res.status(401);
      throw new Error("invalid HR id");
    }
  }
});

// Delete account
// @desc delete workspace == set isDeleted to false
// @route put /api/workspace/deleteworkspace/:idworkspace
// @access private
const deleteWorkspace = asyncHandler(async (req, res) => {
  var verif = false;
  const workspace = await Workspace.findById(req.params.idworkspace);
  if (!workspace) {
    res.status(400);
    throw new Error("invalid workspace id");
  } else {
    for (let i = 0; i < workspace.assigned_members.length; i++) {
      if (
        workspace.assigned_members[i].member == req.params.idhr &&
        workspace.assigned_members[i].isHR == true
      )
        verif = true;
    }
    if (verif) {
      const filter = { _id: req.params.idworkspace };
      const update = { isDeleted: true };

      let deletedworkspace = await Workspace.findOneAndUpdate(filter, update, {
        new: true,
      })
        .then((deletedworkspace) => res.status(200).json(deletedworkspace))
        .catch((err) => {
          res.status(400);
          throw new Error("invalid workspace id");
        });
    } else {
      res.status(401);
      throw new Error("invalid HR id");
    }
  }
});

// Update workspace
// @desc update workspace
// @route put /api/workspace/update/:id
// @access public
const updateWorkspace = asyncHandler(async (req, res) => {
  var verif = false;
  const workspace = await Workspace.findById(req.params.idworkspace);
  if (!workspace) {
    res.status(400);
    throw new Error("invalid workspace id");
  } else {
    for (let i = 0; i < workspace.assigned_members.length; i++) {
      if (
        workspace.assigned_members[i].member == req.params.idhr &&
        workspace.assigned_members[i].isHR == true
      )
        verif = true;
    }
    if (verif) {
      //
      const entries = Object.keys(req.body);
      const updates = {};

      // constructing dynamic query : get the informations entered in BODY
      for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i];
      }
      // update workspace fields according to the BODY
      Workspace.updateOne(
        { _id: req.params.idworkspace },
        { $set: updates },
        function (err, success) {
          if (err) throw err;
          else {
            res.send({ msg: "update success" });
          }
        }
      );
    } else {
      res.status(401);
      throw new Error("invalid HR id");
    }
  }
});

// Assign Project Manager
// @desc assign project manager
// @route post /api/workspace/assignPM/:idworkspace/:idMember
// @access public
const assignProjectManager = asyncHandler(async (req, res) => {
  /*first step: verify if there is already a ProjectManager
  var verif = false;
  const workspace = await Workspace.findById(req.params.idworkspace)
  for (let i = 0; i < workspace.assigned_members.length; i++) {
    if (workspace.assigned_members[i].isProjectManager == true)
        verif = true;
    }
    //If yes, we cannot assign another
  if(verif){
  res.send({ msg: "There s already a project manager" });
  }
    //if no , assign this member
  else{*/

  // find workspace and member in this workspace
  Workspace.updateOne(
    {
      _id: req.params.idworkspace,
      "assigned_members.member": req.params.idmember,
    },
    {
      $set: {
        "assigned_members.$.isProjectManager": true,
      },
    },
    function (err, success) {
      if (err) throw err;
      else {
        res.send({ msg: "Added project manager" });
      }
    }
  );
});

// Assign Project Manager
// @desc delete project manager
// @route post /api/workspace/deletePM/:idworkspace/:idMember
// @access public
const deleteProjectManager = asyncHandler(async (req, res) => {
  // find workspace and member in this workspace
  Workspace.updateOne(
    {
      _id: req.params.idworkspace,
      "assigned_members.member": req.params.idmember,
    },
    {
      $set: {
        "assigned_members.$.isProjectManager": false,
      },
    },
    function (err, success) {
      if (err) throw err;
      else {
        res.send({ msg: "deleted project manager" });
      }
    }
  );
});

module.exports = {
  addWorkspace,
  updateWorkspace,
  getWorkspaces,
  removeMemberFromWorkspace,
  assignProjectManager,
  deleteProjectManager,
  deleteWorkspace,
  getWorkspaceById,
};
