const asyncHandler = require("express-async-handler");
const Workspace = require("../models/workspaceModel");
const Member = require("../models/memberModel");

// @desc Get workspaces by member
// @route get /api/workspace
// @access private
const getWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({
    "assigned_members.member": req.params.idmember,
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
  const workspaceExist = await Workspace.findOne({ name });

  if (workspaceExist) {
    res.status(400);
    throw new Error("workspace already exists");
  }
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

// Delete account
// @desc delete workspace == set isDeleted to false
// @route put /api/workspace/deleteworkspace/:idworkspace
// @access private
const deleteWorkspace = asyncHandler(async (req, res) => {
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
});

// Update workspace
// @desc update workspace
// @route put /api/workspace/update/:id
// @access public
const updateWorkspace = asyncHandler(async (req, res) => {
  //
  const entries = Object.keys(req.body);
  const updates = {};

  // constructing dynamic query : get the informations entered in BODY
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  // update workspace fields according to the BODY
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

// Update workspace
// @desc update workspace 
// @route post /api/workspace/update/:id
// @access public
const inviteOneMember = asyncHandler(async (req, res) => {
  const idworkspace = req.params.id;
  const memberEmail = req.body.email;
  const memberIsHR = req.body.memberIsHR;
  const memberRateHour = req.body.memberRateHour;
  const memberRateOverTime = req.body.memberRateOverTime;
  let member = await Member.findOne({email: memberEmail});
  member.isHR = memberIsHR;
  member.rateHour = memberRateHour;
  member.rateOverTime = memberRateOverTime;
  
  if (!member) {
    res.status(404);
    throw new Error("member not found");
  } else if (member.isDeleted||!member.isValidated) {
    res.status(400);
    throw new Error("member not validated");
  } 
  const workspace = await Workspace.findOneAndUpdate(
    { _id: idworkspace },
    {
      $push: { assigned_members: { member: member } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  } 
  res.send({
    status: 200,
    message: "member invited to workspace successfully",
    data : {
      workspace: workspace,
      member: member
    }

  })
})

const fetchUsersByWorkspace = asyncHandler(async(req, res) => {
  const workspaceId = req.params.idworkspace;
  console.log(workspaceId)
  const workspace = await Workspace.findOne({_id: workspaceId});
  console.log(workspace);
  let members = [];
  for(let i = 0; i < workspace.assigned_members.length; i++){
    let  member = await workspace.assigned_members[i];
    const fullMember = await Member.findOne({_id: member.member});
    console.log("--------------")
    console.log(member);

    console.log(fullMember);
    member.firstName = fullMember.firstName;
    member.lastName = fullMember.lastName? fullMember.lastName : "";
    member.email = fullMember.email? fullMember.email : "";
    member.gender = fullMember.gender? fullMember.gender : "";
    member.phone = fullMember.phone? fullMember.phone: "";
    member.address = fullMember.address? fullMember.address : "";
    member.state = fullMember.state? fullMember.state : "";
    member.country = fullMember.country? fullMember.country : "";
    member.city = fullMember.city? fullMember.city : "";
    member.zipCode = fullMember.zipCode? fullMember.zipCode : "";
    member.about = fullMember.about? fullMember.about : "";
    console.log("new member");
    console.log(member);
    members.push(member);
  }
  const filter = {}
  if (!members) {
    throw new Error("members not found");
  }
  return res.status(200).json(members);
});

module.exports = {
  addWorkspace,
  updateWorkspace,
  inviteOneMember,
  getWorkspaces,
  removeMemberFromWorkspace,
  fetchUsersByWorkspace,
  deleteWorkspace,
};
