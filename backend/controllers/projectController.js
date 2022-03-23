const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Workspace = require("../models/workspaceModel");
const {
  ProjectHasTeamLeader,
  MemberInWorkspace,
} = require("../helpers/functions");

const getProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({
      success: false,
      error: "Project not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: project,
  });
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  console.log("projects");
  console.log(projects);
  if (projects.length === 0) {
    return res.status(404).json({
      success: false,
      error: "No projects found in db",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByWorkspace = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
  });
  if (projects.length === 0) {
    return res.status(404).json({
      success: false,
      error: "No projects found in this workspace",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByMember = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
    "assigned_members.memberId": req.params.idmember,
  });
  if (projects.length === 0) {
    return res.status(404).json({
      success: false,
      error: "No projects found for this member",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByManager = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
    "assigned_members.memberId": req.params.idmember,
    "assigned_members.isProjectManager": true,
  });
  if (projects.length === 0) {
    return res.status(404).json({
      success: false,
      error: "No projects found with this member as project manager",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByTeamLeader = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
    "assigned_members.memberId": req.params.idmember,
    "assigned_members.isTeamLeader": true,
  });
  if (projects.length === 0) {
    return res.status(404).json({
      success: false,
      error: "No projects found with this member as team leader",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});


const getFullMembersByProject = asyncHandler(async (req, res) => {
  const id = req.params.idproject;
  let project = await Project.findById(id);
  let members = [];

  for( const member of project.assigned_members) {
    const member1 = await Member.findById(member.memberId);
    members.push(member1);
  }
  if(!members) {
    return res.status(404).json({
      success: false,
      error: "No members found for this project",
    });
  }
  res.status(200).json({
    success: true,
    count: members.length,
    data: members,
  });
});

// @route post /api/project/add/
// you need to provide the required fields in the body
// you need to provide memberId(the member creating the project) in the body
const addProject = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startDate,
    expectedEndDate,
    projectManagerId,
    teamLeadId,
    workspaceId,
  } = req.body;
  if (!name || !description || !startDate || !expectedEndDate) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  }
  workspace.assigned_members.forEach((element) => {
    if (element.member.equals(projectManagerId)) {
      if (!element.isProjectManager) {
        res.status(403);
        throw new Error("you are not allowed to create a project");
      }
    }
  });

  const member = await Member.findById(projectManagerId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  }

  //check if the team lead is in the workspace
  if (!MemberInWorkspace(teamLeadId, workspaceId)) {
    res.status(404);
    throw new Error("User not assigned to the workspace!");
  }

  let assigned_members = [];

  const projectManager = {
    memberId: projectManagerId,
    isProjectManager: true,
  };

  const teamLead = {
    memberId: teamLeadId,
    isTeamLeader: true,
  };
  assigned_members.push(projectManager);
  assigned_members.push(teamLead);

  const project = await Project.create({
    name,
    description,
    startDate,
    expectedEndDate,
    assigned_members: assigned_members,
    workspace: workspaceId,
  }).catch((err) => {
    res.status(400);
    throw new Error("could not create project", err);
  });
  res.status(201).json({ project });
});

// @route put /api/project/delete/:id
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;
  const workspaceId = req.body.workspaceId;

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  }
  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  } else {
    workspace.assigned_members.forEach((element) => {
      if (element.member.equals(memberId)) {
        if (!element.isProjectManager) {
          res.status(403);
          throw new Error("you are not allowed to delete this project");
        }
      }
    });
  }
  try {
    await Project.findByIdAndUpdate(projectId, {
      isDeleted: true,
    });
  } catch {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json("project deleted");
});

// @route put /api/project/delete/:id
const unDeleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;
  const workspaceId = req.body.workspaceId;

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  }
  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  } else {
    workspace.assigned_members.forEach((element) => {
      if (element.member.equals(memberId)) {
        if (!element.isProjectManager) {
          res.status(403);
          throw new Error("you are not allowed to undelete this project");
        }
      }
    });
  }

  try {
    await Project.findByIdAndUpdate(projectId, {
      isDeleted: false,
    });
  } catch {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json("project Undeleted");
});

// @route put /api/project/assignteamleader/:id
const assignTeamLeader = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("member not found");
  }
  if (ProjectHasTeamLeader(projectId)) {
    // a project necessarily has ONLY ONE team leader
    res.status(400);
    throw new Error("project already has a team leader");
  }
  const teamLeader = {
    memberId: memberId,
    isTeamLeader: true,
  };
  project.assigned_members.push(teamLeader);
  project.save();
  res.status(200).json("team leader assigned");
});

// @route put /api/project/discharge/:idproject/:idmember/:idpm
// idmember : member to discharge
// idpm : id of the current user : is it a pm?
const dischargeTeamLeader = asyncHandler(async (req, res) => {
  var verif = false;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idpm &&
      project.assigned_members[i].isProjectManager == true
    )
      verif = true;
  }
  if (!verif) {
    es.status(404);
    throw new Error("changes are not made by a PM!");
  } else {
    if (!project) {
      res.status(404);
      throw new Error("project not found");
    } else {
      const member = await Member.findById(req.params.idmember);
      if (!member) {
        res.status(404);
        throw new Error("member not found");
      } else {
        Project.updateOne(
          {
            _id: req.params.idproject,
            "assigned_members.memberId": req.params.idmember,
          },
          {
            $set: {
              "assigned_members.$.isTeamLeader": false,
            },
          },
          function (err, success) {
            if (err) throw err;
            else {
              res.send({ msg: "Discharged TEAMLEADER" });
            }
          }
        );
      }
    }
  }
});

// @route post /api/project/update/:idproject/:idpm
// you need to provide the required fields in the body
// you need to provide memberId(the member creating the project) in the body
const updateProject = asyncHandler(async (req, res) => {
  var verif = false;
  const project = await Project.findById(req.params.idproject);
  if (!project) {
    /*if not, error*/
    res.status(400);
    throw new Error("invalid project id");
  } else {
    /*if yes, verify if changes are made by a pm */
    for (let i = 0; i < project.assigned_members.length; i++) {
      if (
        project.assigned_members[i].memberId == req.params.idpm &&
        project.assigned_members[i].isProjectManager == true
      )
        verif = true;
    }
    if (verif) {
      const entries = Object.keys(req.body);
      const updates = {};

      // constructing dynamic query : get the informations entered in BODY
      for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i];
      }
      // update workspace fields according to the BODY
      Project.updateOne(
        { _id: req.params.idproject },
        { $set: updates },
        function (err, success) {
          if (err) throw err;
          else {
            res.status(201).json({ project });
          }
        }
      );
    } else {
      res.status(401);
      throw new Error("invalid ProjectManager id");
    }
  }
});

/**
 * @desc invite a list of members to a workspace
 * @var(members,list of member emails )
 * @var(role, so that we can know if the members should be affected as managers or not)
 * @route PUT /api/project/invite-members/:idproject/:idpm
 * idpm : id of current user inviting
 */
const inviteMembers = asyncHandler(async (req, res, next) => {
  const emails = req.body.emails;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idpm &&
      project.assigned_members[i].isTeamLeader == true
    )
      verif = true;
  }

  if (!verif) {
    es.status(404);
    throw new Error("changes are not made by a PM!");
  } else {
    for (let i = 0; i < emails.length; i++) {
      let member = await Member.findOne({ email: emails[i] });
      const invitedMember = {
        memberId: member._id,
      };
      await Project.findOneAndUpdate(
        { _id: req.params.idproject },
        {
          $push: { assigned_members: invitedMember },
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json(emails);
  }
});

/**
 * @desc invite a list of members to a workspace
 * @var(members,list of member emails )
 * @var(role, so that we can know if the members should be affected as managers or not)
 * @route PUT /api/project/invite-members/:idproject/:idpm
 * idpm : id of current user inviting
 */
const deleteMembers = asyncHandler(async (req, res, next) => {
  const emails = req.body.emails;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idpm &&
      project.assigned_members[i].isTeamLeader == true
    )
      verif = true;
  }

  if (!verif) {
    es.status(404);
    throw new Error("changes are not made by a PM!");
  } else {
    for (let i = 0; i < emails.length; i++) {
      let member = await Member.findOne({ email: emails[i] });
      const invitedMember = {
        memberId: member._id,
      };
      await Project.findOneAndUpdate(
        { _id: req.params.idproject },
        {
          $pull: { assigned_members: invitedMember },
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json(emails);
  }
});

module.exports = {
  addProject,
  deleteProject,
  unDeleteProject,
  assignTeamLeader,
  updateProject,
  dischargeTeamLeader,
  inviteMembers,
  deleteMembers,
  getProjects,
  getProjectsByWorkspace,
  getProjectsByManager,
  getProjectsByTeamLeader,
  getProjectsByMember,
  getProject,
  getFullMembersByProject,
};
