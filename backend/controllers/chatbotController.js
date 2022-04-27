const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Workspace = require("../models/workspaceModel");
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

module.exports = {
  getProjectsByMemberchatbot,
};
