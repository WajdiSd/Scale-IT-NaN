const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const { MemberInProject,MemberInWorkspace } = require("../helpers/functions");
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

// @route get /api/performance/getLateTasksPercentage/idproj/idmember
const getLateTasksPercentage = asyncHandler(async (req, res) => {
 //verify if project is valid
 const project = await Project.findById({
  _id: req.params.idproj,
  isDeleted: false,
  });
if (!project) {
  res.status(404);
  throw new Error("project not found");
}
//verify if member is in project
let exists = await MemberInProject(req.params.idmember, req.params.idproj);
if (!exists) {
  res.status(404);
  throw new Error("user is not in project");
} else {
 //calculate number of tasks finished late
 let totaltasks = await Task.find( {
  project: req.params.idproj,
  "members.memberId": req.params.idmember,
  isDeleted: false,
});
 var totalLateTasks = 0;
 var numberOfTasks = 0;
 for (var task of totaltasks) {
      numberOfTasks=numberOfTasks+1;
      if (task.endDate > task.expectedEndDate) { 
        totalLateTasks=totalLateTasks+1;}
      }
  var percentage = (totalLateTasks/numberOfTasks)*100;
  res.status(200).json({
    totallatetasks: totalLateTasks,
    numberOfTasks: numberOfTasks,
    percentage: percentage,
  });
}
});

// @route get /api/performance/getLateTasksPercentage/idproj/idmember
const getTasksInTimePercentage = asyncHandler(async (req, res) => {
  //verify if project is valid
  const project = await Project.findById({
   _id: req.params.idproj,
   isDeleted: false,
   });
 if (!project) {
   res.status(404);
   throw new Error("project not found");
 }
 //verify if member is in project
 let exists = await MemberInProject(req.params.idmember, req.params.idproj);
 if (!exists) {
   res.status(404);
   throw new Error("user is not in project");
 } else {
  //calculate number of tasks finished early
  let totaltasks = await Task.find( {
   project: req.params.idproj,
   "members.memberId": req.params.idmember,
   isDeleted: false,
 });
  var totalTasksInTime = 0;
  var numberOfTasks = 0;
  for (var task of totaltasks) {
       numberOfTasks=numberOfTasks+1;
       if (task.endDate <= task.expectedEndDate) { 
        totalTasksInTime=totalTasksInTime+1;}
       }
   var percentage = (totalTasksInTime/numberOfTasks)*100;
   res.status(200).json({
    totalTasksInTime: totalTasksInTime,
     numberOfTasks: numberOfTasks,
     percentage: percentage,
   });
 }
 });

// @route get /api/performance/getLateProjectsPercentage/idworkspace/idmember
const getLateProjectsPercentage = asyncHandler(async (req, res) => {
  //verify if project is valid
  const workspace = await Workspace.findById({
   _id: req.params.idworkspace,
   isDeleted: false,
   });
 if (!workspace) {
   res.status(404);
   throw new Error("workspace not found");
 }
 //verify if member is in project
 let exists = await MemberInWorkspace(req.params.idmember, req.params.idworkspace);
 if (!exists) {
   res.status(404);
   throw new Error("user is not in workspace");
 } else {
  //calculate number of projects finished late
  let totalprojects = await Project.find( {
    workspace: req.params.idworkspace,
   "assigned_members.memberId": req.params.idmember,
   isDeleted: false,
 });
  var totalLateProjects = 0;
  var numberOfProjects = 0;
  for (var project of totalprojects) {
      numberOfProjects=numberOfProjects+1;
       if (project.endDate > project.expectedEndDate) { 
        totalLateProjects=totalLateProjects+1;}
       }
   var percentage = (totalLateProjects/numberOfProjects)*100;
   res.status(200).json({
    totalLateProjects: totalLateProjects,
    numberOfProjects: numberOfProjects,
     percentage: percentage,
   });
 }
 });


module.exports = {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getLateTasksPercentage,
  getTasksInTimePercentage,
  getLateProjectsPercentage,
};
