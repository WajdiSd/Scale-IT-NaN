const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Workspace = require("../models/workspaceModel");
const UserScore = require("../models/userscoreModel");
const Task = require("../models/taskModel");
const { getPerformanceByMember } = require("../helpers/functions");

/**
 * todo: change "push in tables" by compteur .
 */
// const getPerformanceByMember = asyncHandler(async (req, res) => {
//   const task = await Task.find({
//     "members.memberId": req.params.memberId,
//     status: "done",
//   });

//   const ftfe = [];
//   const fcit = [];
//   const fcfaster = [];
//   const ftit = [];

//   const ftat = [];
//   const fcat = [];

//   task.map((task) => {
//     if (task.expectedEndDate > task.endDate) {
//       if (task.expectedEndDate.getTime() - task.startDate.getTime() >= 8)
//         fcit.push(task);
//       if (
//         task.expectedEndDate.getTime() - task.startDate.getTime() >= 8 &&
//         task.endDate - task.startDate <=
//           (task.expectedEndDate - task.startDate) * (2 / 3)
//       )
//         fcfaster.push(task);
//       if (
//         task.endDate - task.startDate <=
//         (task.expectedEndDate - task.startDate) * (2 / 3)
//       )
//         ftfe.push(task);

//       ftit.push(task);
//     } else {
//       if (task.expectedEndDate.getTime() - task.startDate.getTime() >= 8)
//         fcat.push(task);

//       ftat.push(task);
//     }
//   });

//   console.log("ftfe", ftfe);
//   console.log("fcit", fcit);
//   console.log("fcfaster", fcfaster);
//   console.log("ftat", ftat);
//   console.log("ftit", ftit);
//   console.log("fcat", fcat);

//   const performance =
//     ftfe.length* 3 +
//     fcit.length * 4.5 +
//     fcfaster.length * 6 +
//     ftit.length * 2 +
//     (ftat.length * 1 + fcat.length * 1.5);
//   res.status(200).json({
//     performance: performance,
//   });

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

module.exports = {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
};
