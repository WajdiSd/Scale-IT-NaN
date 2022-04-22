const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Workspace = require("../models/workspaceModel");
const UserScore = require("../models/userscoreModel");
const Task = require("../models/taskModel");
const {
  getPerformanceByMember,
  getWorkspaceHr,
} = require("../helpers/functions");

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

          // console.log(obj);
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

          // console.log(obj);
          leaderboard.push(obj);
        }
      }
    }
    res.status(200).json({
      leaderboard: leaderboard.sort((a, b) => b.score - a.score),
    });
  }
});

const test = asyncHandler(async (req, res) => {
  console.log("el bot");

  res.status(200).json({
    message: "test",
  });
});

const getScoreProject = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberid);
  if (!member) {
    res.status(400);
    throw new Error("invalid member id");
  } else {
    const userscores = await UserScore.find({ member: req.params.memberid });
    let score = 0;
    for (const user of userscores) {
      for (const s of user.score_project) {
        if (s.projectId == req.params.projectid) {
          score = s.score;
          break;
        }
      }
    }
    res.status(200).json({
      score: score,
    });
  }
});

const getScoreWorkspace = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberid);
  if (!member) {
    res.status(400);
    throw new Error("invalid member id");
  } else {
    const userscores = await UserScore.find({ member: req.params.memberid });
    let score = 0;
    for (const user of userscores) {
      for (const s of user.score_workspace) {
        if (s.workspaceId == req.params.workspaceid) {
          score = s.score;
          break;
        }
      }
    }
    res.status(200).json({
      score: score,
    });
  }
});

const getAllFinishedProjectsInTimePourcentage = asyncHandler(
  async (req, res) => {
    const hr = await getWorkspaceHr(req.params.workspaceid);
    if (hr.member.equals(req.member._id)) {
      const allProjects = await Project.find({
        workspace: req.params.workspaceid,
      });
      const fininshedProjects = await Project.find({
        workspace: req.params.workspaceid,
        status: "finished",
      });
      res.status(200).json({
        allProjects: allProjects,
        finishedProjects: fininshedProjects,
        finishedProjectsInTimePourcentage:
          (fininshedProjects.length * 100) / allProjects.length,
      });
    } else {
      res.status(204);
      throw new Error("you are not the workspace hr");
    }
  }
);

const getAllFinishedProjectsLatePourcentage = asyncHandler(async (req, res) => {
  const hr = await getWorkspaceHr(req.params.workspaceid);
  if (hr.member.equals(req.member._id)) {
    const allProjects = await Project.find({
      workspace: req.params.workspaceid,
    });
    const fininshedProjects = await Project.find({
      workspace: req.params.workspaceid,
      status: "finished with delay",
    });

    res.status(200).json({
      allProjects: allProjects,
      finishedProjects: fininshedProjects,
      finishedProjectsLatePourcentage:
        (fininshedProjects.length * 100) / allProjects.length,
    });
  } else {
    res.status(204);
    throw new Error("you are not the workspace hr");
  }
});
module.exports = {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getScoreProject,
  getScoreWorkspace,
  getAllFinishedProjectsInTimePourcentage,
  getAllFinishedProjectsLatePourcentage,
};
