const workspaceModel = require("../models/workspaceModel");
const projectModel = require("../models/projectModel");
const Task = require("../models/taskModel");
const UserScore = require("../models/userscoreModel");
const Workspace = require("../models/workspaceModel");

async function MemberInWorkspace(memberId, workspaceId) {
  let exist = false;
  const workspace = await workspaceModel.findOne({ _id: workspaceId });
  if (!workspace) {
    return false;
  } else {
    for (let i = 0; i < workspace.assigned_members.length; i++) {
      if (workspace.assigned_members[i].member.equals(memberId)) {
        exist = true;
      }
    }
  }

  return exist;
}

async function MemberInProject(memberId, projectId) {
  let exist = false;
  const project = await projectModel.findById(projectId);
  if (!project) {
    return false;
  } else {
    for (let i = 0; i < project.assigned_members.length; i++) {
      if (project.assigned_members[i].memberId.equals(memberId)) {
        exist = true;
      }
    }
  }

  return exist;
}

async function ProjectHasTeamLeader(projectId) {
  const project = await projectModel.findOne({ _id: projectId });
  if (!project || project.assigned_members.length === 0) {
    return false;
  }
  project.assigned_members.forEach((element) => {
    if (element.isTeamLeader) {
      return true;
    }
  });
  return false;
}

/**
 * todo: change "push in tables" by compteur .
 */
async function getPerformanceByMember(memberId) {
  const task = await Task.find({
    "members.memberId": memberId,
    status: "done",
  });

  const ftfe = [];
  const fcit = [];
  const fcfaster = [];
  const ftit = [];

  const ftat = [];
  const fcat = [];

  task.map((task) => {
    if (task.expectedEndDate > task.endDate) {
      if (task.expectedEndDate.getTime() - task.startDate.getTime() >= 8)
        fcit.push(task);
      if (
        task.expectedEndDate.getTime() - task.startDate.getTime() >= 8 &&
        task.endDate - task.startDate <=
          (task.expectedEndDate - task.startDate) * (2 / 3)
      )
        fcfaster.push(task);
      if (
        task.endDate - task.startDate <=
        (task.expectedEndDate - task.startDate) * (2 / 3)
      )
        ftfe.push(task);

      ftit.push(task);
    } else {
      if (task.expectedEndDate.getTime() - task.startDate.getTime() >= 8)
        fcat.push(task);

      ftat.push(task);
    }
  });

  // console.log("ftfe", ftfe);
  // console.log("fcit", fcit);
  // console.log("fcfaster", fcfaster);
  // console.log("ftat", ftat);
  // console.log("ftit", ftit);
  // console.log("fcat", fcat);

  const performance =
    ftfe.length * 3 +
    fcit.length * 4.5 +
    fcfaster.length * 6 +
    ftit.length * 2 +
    (ftat.length * 1 + fcat.length * 1.5);

  console.log(performance);
  return performance;
}

async function updatescoremembersinworkspace(workspaceId) {
  const workspace = await Workspace.findById(workspaceId);
  console.log(workspaceId);
  if (!workspace) {
    console.log("invalid workspace id");
  } else {
    for (assignee of workspace.assigned_members) {
      const newscore = await getPerformanceByMember(assignee.member);
      console.log(newscore);
      if (newscore) {
        const user_score = await UserScore.findOneAndUpdate(
          {
            member: assignee.member,
            "score_workspace.workspaceId": workspaceId,
          },
          {
            $set: { "score_workspace.score": newscore },
          },
          { upsert: true, new: true }
        );
      }
    }
    console.log("updating workspace leaderboard");
  }
}

async function updatescoremembersinproject(projectId) {
  const project = await projectModel.findById(projectId);
  if (!project) {
    console.log("invalid project id");
  } else {
    for (assignee of project.assigned_members) {
      const newscore = await getPerformanceByMember(assignee.memberId);
      if (newscore) {
        const user_score = await UserScore.findOneAndUpdate(
          {
            member: assignee.member,
            "score_project.projectId": projectId,
          },
          {
            $set: { "score_project.score": newscore },
          },
          { upsert: true, new: true }
        );
      }
    }
    console.log("updating project leaderboard");
  }
}

module.exports = {
  MemberInWorkspace,
  ProjectHasTeamLeader,
  MemberInProject,
  getPerformanceByMember,
  updatescoremembersinworkspace,
  updatescoremembersinproject,
};
