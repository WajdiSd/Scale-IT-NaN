const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const { ProjectHasTeamLeader } = require("../helpers/functions");
// @route post /api/project/add/
// you need to provide the required fields in the body
// you need to provide memberId(the member creating the project) in the body
const addProject = asyncHandler(async (req, res) => {
  const { name, description, startDate, expectedEndDate, memberId } = req.body;
  if (!name || !description || !startDate || !expectedEndDate) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const projectManager = {
    memberId: memberId,
    isProjectManager: true,
  };

  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  }
  const project = await Project.create({
    name,
    description,
    startDate,
    expectedEndDate,
    assigned_members: [projectManager],
  }).catch((err) => {
    res.status(400);
    throw new Error("could not create project", err);
  });
  res.status(201).json({ project });
});

// @route put /api/project/delete/:id
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findByIdAndUpdate(projectId, {
    isDeleted: true,
  });
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json("project deleted");
});

// @route put /api/project/delete/:id
const unDeleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findByIdAndUpdate(projectId, {
    isDeleted: false,
  });
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json("project deleted");
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
  if(ProjectHasTeamLeader(projectId)){ // a project necessarily has ONLY ONE team leader
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

module.exports = {
  addProject,
  deleteProject,
  unDeleteProject,
  assignTeamLeader,
};
