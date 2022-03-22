const workspaceModel = require("../models/workspaceModel");
const projectModel = require("../models/projectModel");

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

async function ProjectHasTeamLeader(projectId) {
  const project = await projectModel.findOne({ _id: projectId });
  if (!project||project.assigned_members.length === 0) {
    return false;
  }
  project.assigned_members.forEach(element => {
    if(element.isTeamLeader){
      return true;
    } 
  });
  return false;
}

module.exports = { MemberInWorkspace, ProjectHasTeamLeader };
