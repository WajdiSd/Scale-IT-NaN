const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Workspace = require("../models/workspaceModel");
const Task = require("../models/taskModel");
const {
  ProjectHasTeamLeader,
  MemberInWorkspace,
  MemberInProject,
} = require("../helpers/functions");

const getProjectsByMemberchatbot = asyncHandler(async (req, res) => {
  const projects = await Project.find(
    {
      workspace: req.params.idworkspace,
      "assigned_members.memberId": req.params.idmember,
      "assigned_members.isDeleted": false,
    },
    { _id: 1, name: 1, workspace: 1, status: 1 }
  );
  if (projects.length === 0) {
    return res.status(200).json({
      data: [],
      success: true,
      error: "No projects found for this member",
    });
  }
  res.status(200).json({
    data: projects,
  });
});

const getWorkspaceName = asyncHandler(async (req, res) => {
  const workspace = await Workspace.findOne(
    {
      _id: req.params.idworkspace,
    },
    { name: 1 }
  );
  if (!workspace) {
    return res.status(404).json({ message: "No workspace found" });
  } else {
    res.status(200).json(workspace);
  }
});

const getProjectName = asyncHandler(async (req, res) => {
  const project = await Project.findOne(
    {
      _id: req.params.idproject,
    },
    { name: 1 }
  );
  if (!project) {
    return res.status(404).json({ message: "No project found" });
  } else {
    res.status(200).json(project);
  }
});

const getallUserTasks = asyncHandler(async (req, res) => {
  const alltasks = await Task.find(
    {
      project: req.params.projectId,
      "members.memberId": req.params.memberId,
      isDeleted: false,
    },
    { name: 1, status: 1, priority: 1 }
  );
  res.status(200).json({
    tasks: alltasks,
  });
});

const getUserToDoTasks = asyncHandler(async (req, res) => {
  const todotasks = await Task.find(
    {
      project: req.params.projectId,
      "members.memberId": req.params.memberId,
      isDeleted: false,
      status: "to_do",
    },
    { name: 1, status: 1, priority: 1 }
  );
  res.status(200).json({
    tasks: todotasks,
  });
});

const getUserDoingTasks = asyncHandler(async (req, res) => {
  const doingtasks = await Task.find(
    {
      project: req.params.projectId,
      "members.memberId": req.params.memberId,
      isDeleted: false,
      status: "doing",
    },
    { name: 1, status: 1, priority: 1 }
  );
  res.status(200).json({
    tasks: doingtasks,
  });
});

const getUserReviewTasks = asyncHandler(async (req, res) => {
  const reviewtasks = await Task.find(
    {
      project: req.params.projectId,
      "members.memberId": req.params.memberId,
      isDeleted: false,
      status: "review",
    },
    { name: 1, status: 1, priority: 1 }
  );
  res.status(200).json({
    tasks: reviewtasks,
  });
});

const getUserDoneTasks = asyncHandler(async (req, res) => {
  const donetasks = await Task.find(
    {
      project: req.params.projectId,
      "members.memberId": req.params.memberId,
      isDeleted: false,
      status: "done",
    },
    { name: 1, status: 1, priority: 1 }
  );
  res.status(200).json({
    tasks: donetasks,
  });
});

module.exports = {
  getProjectsByMemberchatbot,
  getWorkspaceName,
  getProjectName,
  getallUserTasks,
  getUserToDoTasks,
  getUserDoingTasks,
  getUserDoneTasks,
  getUserReviewTasks,
};
