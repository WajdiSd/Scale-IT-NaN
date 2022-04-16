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
    const userscores = await UserScore.find();
    for (const user of userscores) {
      for (const s of user.score_workspace) {
        if (s.workspaceId == req.params.workspaceid) {
          const memb = await Member.findById(user.member);
          let obj = {
            member: user.member,
            score: s.score,
            email: memb.email,
            first: memb.firstName,
            last: memb.lastName,
          };

          console.log(obj);
          leaderboard.push(obj);
        }
      }
    }
    res.status(200).json({
      leaderboard: leaderboard.sort((a, b) => b.score - a.score),
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
    const userscores = await UserScore.find();
    for (const user of userscores) {
      for (const s of user.score_project) {
        if (s.projectId == req.params.projectid) {
          const memb = await Member.findById(user.member);
          let obj = {
            member: user.member,
            score: s.score,
            email: memb.email,
            first: memb.firstName,
            last: memb.lastName,
          };

          console.log(obj);
          leaderboard.push(obj);
        }
      }
    }
    res.status(200).json({
      leaderboard: leaderboard.sort((a, b) => b.score - a.score),
    });
  }
});

module.exports = {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
};
