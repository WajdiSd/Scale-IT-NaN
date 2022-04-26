const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const { MemberInProject, MemberInWorkspace } = require("../helpers/functions");
const Workspace = require("../models/workspaceModel");
const UserScore = require("../models/userscoreModel");
const Task = require("../models/taskModel");
const { getWorkspaceHr } = require("../helpers/functions");
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

const getMemberTasksContribution = asyncHandler(async (req, res) => {
  const project = await Project.findById({
    _id: req.params.projectId,
    isDeleted: false,
  });
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  } else {
    const Membertasks = await Task.find({
      project: req.params.projectId,
      "members.memberId": req.params.memberId,
      isDeleted: false,
    });
    const totaltasks = await Task.find({
      project: req.params.projectId,
      isDeleted: false,
    });
    contribution = Membertasks.length / totaltasks.length;

    res.status(200).json({
      contribution: contribution,
    });
  }
});

const getRankProjectLeaderboard = asyncHandler(async (req, res) => {
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
    let rank = 0;
    for (let i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i].member.equals(req.params.memberId)) rank = i + 1;
    }
    res.status(200).json({
      rank: rank,
    });
  }
});

const getScoreWorkspace = asyncHandler(async (req, res) => {
  console.log(req.params);
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

const getRankWorkspaceLeaderboard = asyncHandler(async (req, res) => {
  let leaderboard = [];
  const workspace = await Workspace.findById(req.params.workspaceid);
  console.log(workspace);
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

    let rank = 0;
    for (let i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i].member.equals(req.params.memberId)) rank = i + 1;
    }
    res.status(200).json({
      rank: rank,
    });
  }
});

const getAllFinishedProjectsInTimePourcentage = asyncHandler(
  async (req, res) => {
    const hr = await getWorkspaceHr(req.params.workspaceid);
    console.log(hr);
    if (hr.member.equals(req.member._id)) {
      const allProjects = await Project.find({
        workspace: req.params.workspaceid,
      });
      console.log("reqqmember",req.member);
      const fininshedProjects = await Project.find({
        workspace: req.params.workspaceid,
        status: "finished",
      });
      if(allProjects.length == 0) {
        res.status(200).json({
          finishedProjects: 0,
        });
      }
      else {
        res.status(200).json({
          finishedProjectsInTimePourcentage:
            (fininshedProjects.length * 100) / allProjects.length,
        });
      }
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

    if(allProjects.length == 0){
      res.status(200).json({
        finishedProjectsLatePourcentage: 0,
      });
    }
    else {
      res.status(200).json({
        finishedProjectsLatePourcentage:
          (fininshedProjects.length * 100) / allProjects.length,
      });
    }
    
  } else {
    res.status(204);
    throw new Error("you are not the workspace hr");
  }
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
    let totaltasks = await Task.find({
      project: req.params.idproj,
      "members.memberId": req.params.idmember,
      isDeleted: false,
    });
    var totalLateTasks = 0;
    var numberOfTasks = 0;
    for (var task of totaltasks) {
      numberOfTasks = numberOfTasks + 1;
      if (task.endDate > task.expectedEndDate) {
        totalLateTasks = totalLateTasks + 1;
      }
    }
    if(numberOfTasks!==0){
      console.log(totalLateTasks,numberOfTasks);
    var percentage = (totalLateTasks / numberOfTasks) * 100;
    res.status(200).json({
      totallatetasks: totalLateTasks,
      numberOfTasks: numberOfTasks,
      percentage: percentage,
    });
    } else {
      res.status(200).json({
        totallatetasks: totalLateTasks,
        numberOfTasks: numberOfTasks,
        percentage: 0,
      });
    }
    
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
  if(numberOfTasks!==0){
    console.log(totalTasksInTime,numberOfTasks);
    var percentage = (totalTasksInTime/numberOfTasks)*100;
    res.status(200).json({
      totalTasksInTime: totalTasksInTime,
       numberOfTasks: numberOfTasks,
       percentage: percentage,
     });
  }
  res.status(200).json({
    totalTasksInTime: totalTasksInTime,
     numberOfTasks: numberOfTasks,
     percentage: 0,
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
  let exists = await MemberInWorkspace(
    req.params.idmember,
    req.params.idworkspace
  );
  if (!exists) {
    res.status(404);
    throw new Error("user is not in workspace");
  } else {
    //calculate number of projects finished late
    let totalprojects = await Project.find({
      workspace: req.params.idworkspace,
      "assigned_members.memberId": req.params.idmember,
      isDeleted: false,
    });
    var totalLateProjects = 0;
    var numberOfProjects = 0;
    for (var project of totalprojects) {
      numberOfProjects = numberOfProjects + 1;
      if (project.endDate > project.expectedEndDate) {
        totalLateProjects = totalLateProjects + 1;
      }
    }
    var percentage = (totalLateProjects / numberOfProjects) * 100;
    res.status(200).json({
      totalLateProjects: totalLateProjects,
      numberOfProjects: numberOfProjects,
      percentage: percentage,
    });
  }
});

// @route get /api/performance/getProjectsInTimePercentage/idworkspace/idmember
const getProjectsInTimePercentage = asyncHandler(async (req, res) => {
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
  let exists = await MemberInWorkspace(
    req.params.idmember,
    req.params.idworkspace
  );
  if (!exists) {
    res.status(404);
    throw new Error("user is not in workspace");
  } else {
    //calculate number of projects finished early
    let totalprojects = await Project.find({
      workspace: req.params.idworkspace,
      "assigned_members.memberId": req.params.idmember,
      isDeleted: false,
    });
    var totalLateProjects = 0;
    var numberOfProjects = 0;
    for (var project of totalprojects) {
      numberOfProjects = numberOfProjects + 1;
      if (project.endDate <= project.expectedEndDate) {
        totalLateProjects = totalLateProjects + 1;
      }
    }
    var percentage = (totalLateProjects / numberOfProjects) * 100;
    res.status(200).json({
      totalLateProjects: totalLateProjects,
      numberOfProjects: numberOfProjects,
      percentage: percentage,
    });
  }
});

const roleinworkspace = asyncHandler(async (req, res) => {
  //verif member who wants to remove is member and HR
  var role = "Member";
  const workspace = await Workspace.findById(req.params.idworkspace);
  if (!workspace) {
    res.status(400);
    throw new Error("invalid workspace id");
  } else {
    for (let i = 0; i < workspace.assigned_members.length; i++) {
      if (
        workspace.assigned_members[i].member == req.params.idmember &&
        workspace.assigned_members[i].isHR == true
      )
        role = "Humain Resources";
      if (
        workspace.assigned_members[i].member == req.params.idmember &&
        workspace.assigned_members[i].isProjectManager == true
      )
        role = "Project Manager";
    }

    res.status(200).json({
      role: role,
    });
  }
});

// @route get /api/performance/getAllTasksInTimePercentage/idproj
const getAllTasksInTimePercentage = asyncHandler(async (req, res) => {
  //verify if project is valid
  const project = await Project.findById({
   _id: req.params.idproj,
   isDeleted: false,
   });
 if (!project) {
   res.status(404);
   throw new Error("project not found");
 }
  //calculate number of tasks finished early
  let totaltasks = await Task.find( {
   project: req.params.idproj,
   isDeleted: false,
 });
  var totalTasksInTime = 0;
  var numberOfTasks = 0;
  for (var task of totaltasks) {
       numberOfTasks=numberOfTasks+1;
       if (task.endDate <= task.expectedEndDate) { 
        totalTasksInTime=totalTasksInTime+1;}
       }
  if(numberOfTasks!==0){
    console.log(totalTasksInTime,numberOfTasks);
    var percentage = (totalTasksInTime/numberOfTasks)*100;
    res.status(200).json({
      totalTasksInTime: totalTasksInTime,
       numberOfTasks: numberOfTasks,
       percentage: percentage,
     });
  }
  res.status(200).json({
    totalTasksInTime: totalTasksInTime,
     numberOfTasks: numberOfTasks,
     percentage: 0,
   });
 });

 // @route get /api/performance/getAllTasksInTimePercentage/idproj
const getAllLateTasksPercentage = asyncHandler(async (req, res) => {
  //verify if project is valid
  const project = await Project.findById({
   _id: req.params.idproj,
   isDeleted: false,
   });
 if (!project) {
   res.status(404);
   throw new Error("project not found");
 }
  //calculate number of tasks finished early
  let totaltasks = await Task.find( {
   project: req.params.idproj,
   isDeleted: false,
 });
  var totallateTasks = 0;
  var numberOfTasks = 0;
  for (var task of totaltasks) {
       numberOfTasks=numberOfTasks+1;
       if (task.endDate > task.expectedEndDate) { 
        totallateTasks=totallateTasks+1;}
       }
  if(numberOfTasks!==0){
    console.log(totallateTasks,numberOfTasks);
    var percentage = (totallateTasks/numberOfTasks)*100;
    res.status(200).json({
      totallateTasks: totallateTasks,
       numberOfTasks: numberOfTasks,
       percentage: percentage,
     });
  }
  res.status(200).json({
    totalTasksInTime: totalTasksInTime,
     numberOfTasks: numberOfTasks,
     percentage: 0,
   });
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
  getMemberTasksContribution,
  getRankProjectLeaderboard,
  getRankWorkspaceLeaderboard,
  getLateTasksPercentage,
  getTasksInTimePercentage,
  getLateProjectsPercentage,
  getProjectsInTimePercentage,
  roleinworkspace,
  getAllTasksInTimePercentage,
  getAllLateTasksPercentage,
};
