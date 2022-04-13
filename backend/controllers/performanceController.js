const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Workspace = require("../models/workspaceModel");
const UserScore = require("../models/userscoreModel");
const Task = require("../models/taskModel");
const { getPerformanceByMember } = require("../helpers/functions");

const getleaderboardbyworkspace = asyncHandler(async (req, res) => {
  let leaderboard = [];
  const workspace = await Workspace.findById(req.params.workspaceid);
  if (!workspace) {
    res.status(400);
    throw new Error("invalid workspace id");
  } else {
    for (let i = 0; i < workspace.assigned_members.length; i++) {
      const userscore = await UserScore.find({
        member: workspace.assigned_members[i].member,
      });
      if (userscore.length > 0) {
        console.log(userscore);
        for (let j = 0; j < userscore.score_workspace.length; j++) {
          if (
            userscore.score_workspace[j].workspaceId == req.params.workspaceid
          ) {
            leaderboard.push({
              userid: workspace.assigned_members[i].member,
              score: userscore.score_workspace[j].score,
            });
          }
        }
      }
    }

    res.status(200).json({
      leaderboard: leaderboard.sort((a, b) => a.score - b.score),
    });
  }
});

const getleaderboardbyproject = asyncHandler(async (req, res) => {
  let leaderboard = [];
  const project = await Project.findById(req.params.projectid);
  if (!project) {
    res.status(400);
    throw new Error("invalid project id");
  } else {
    for (let i = 0; i < project.assigned_members.length; i++) {
      const userscore = await UserScore.find({
        member: project.assigned_members[i].memberId,
      });
      if (userscore.length > 0) {
        console.log(userscore);
        for (let j = 0; j < userscore.score_project.length; j++) {
          if (userscore.score_project[j].projectId == req.params.projectid) {
            leaderboard.push({
              userid: project.assigned_members[i].memberId,
              score: userscore.score_project[j].score,
            });
          }
        }
      }
    }

    res.status(200).json({
      leaderboard: leaderboard.sort((a, b) => a.score - b.score),
    });
  }
});

module.exports = {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
};
