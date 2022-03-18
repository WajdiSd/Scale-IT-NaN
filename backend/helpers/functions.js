const workspaceModel = require("../models/workspaceModel");

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

module.exports = { MemberInWorkspace };
