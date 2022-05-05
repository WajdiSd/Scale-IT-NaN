const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Workspace = require("../models/workspaceModel");
const {
  ProjectHasTeamLeader,
  MemberInWorkspace,
  MemberInProject,
} = require("../helpers/functions");

const getProject = asyncHandler(async (req, res, next) => {
  const { id, iduser } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({
      success: false,
      error: "Project not found",
    });
  }
  let isTeamLeader = false;
  let isProjectManager = false;

  project.assigned_members.forEach((element) => {
    if (String(element.memberId) == iduser) {
      if (element.isTeamLeader) {
        isTeamLeader = true;
      } else if (element.isProjectManager) {
        isProjectManager = true;
      }
    }
  });
  return res.status(200).json({
    success: true,
    isProjectManager: isProjectManager,
    isTeamLeader: isTeamLeader,
    data: project,
  });
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort("-createdAt");
  if (projects.length === 0) {
    return res.status(200).json({
      data: [],
      success: true,
      error: "No projects found in db",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByWorkspace = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
  }).sort("-createdAt");
  if (projects.length === 0) {
    return res.status(200).json({
      data: [],
      success: true,
      error: "No projects found in this workspace",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByMember = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
    "assigned_members.memberId": req.params.idmember,
    "assigned_members.isDeleted": false,
  }).sort("-createdAt");
  if (projects.length === 0) {
    return res.status(200).json({
      data: [],
      success: true,
      error: "No projects found for this member",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByManager = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
    "assigned_members.memberId": req.params.idmember,
    "assigned_members.isProjectManager": true,
  }).sort("-createdAt");
  if (projects.length === 0) {
    return res.status(200).json({
      data: [],
      success: true,
      error: "No projects found with this member as project manager",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectsByTeamLeader = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    workspace: req.params.idworkspace,
    "assigned_members.memberId": req.params.idmember,
    "assigned_members.isTeamLeader": true,
  }).sort("-createdAt");
  if (projects.length === 0) {
    return res.status(200).json({
      data: [],
      success: true,
      error: "No projects found with this member as team leader",
    });
  }
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getFullMembersByProject = asyncHandler(async (req, res) => {
  const id = req.params.idproject;
  let project = await Project.findById(id);
  let members = [];

  for (const member of project.assigned_members) {
    let member1 = await Member.findById(member.memberId);
    if (member1) {
      let obj2 = {
        ...member1._doc,
        isProjectManager: member.isProjectManager,
        isTeamLeader: member.isTeamLeader,
        isDeleted: member.isDeleted,
      };
      members.push(obj2);
    }
  }
  if (!members) {
    return res.status(200).json({
      data: [],
      success: true,
      error: "No members found for this project",
    });
  }
  res.status(200).json({
    success: true,
    count: members.length,
    data: members,
  });
});

// @route post /api/project/add/
// you need to provide the required fields in the body
// you need to provide memberId(the member creating the project) in the body
const addProject = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startDate,
    expectedEndDate,
    projectManagerId,
    teamLeadId,
    workspaceId,
  } = req.body;
  if (!name || !description || !startDate || !expectedEndDate) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  }
  workspace.assigned_members.forEach((element) => {
    if (element.member.equals(projectManagerId)) {
      if (!element.isProjectManager) {
        res.status(403);
        throw new Error("you are not allowed to create a project");
      }
    }
  });

  const member = await Member.findById(projectManagerId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  }

  //check if the team lead is in the workspace
  if (!MemberInWorkspace(teamLeadId, workspaceId)) {
    res.status(404);
    throw new Error("User not assigned to the workspace!");
  }

  let assigned_members = [];

  const projectManager = {
    memberId: projectManagerId,
    isProjectManager: true,
  };

  const teamLead = {
    memberId: teamLeadId,
    isTeamLeader: true,
  };
  assigned_members.push(projectManager);
  assigned_members.push(teamLead);

  const project = await Project.create({
    name,
    description,
    startDate,
    expectedEndDate,
    assigned_members: assigned_members,
    workspace: workspaceId,
  }).catch((err) => {
    res.status(400);
    throw new Error("could not create project", err);
  });
  res.status(201).json({ project });
});

// @route put /api/project/delete/:id
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;
  const workspaceId = req.body.workspaceId;

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  }
  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  } else {
    workspace.assigned_members.forEach((element) => {
      if (element.member.equals(memberId)) {
        if (!element.isProjectManager) {
          res.status(403);
          throw new Error("you are not allowed to delete this project");
        }
      }
    });
  }
  let project = {};
  try {
    project = await Project.findByIdAndUpdate(projectId, {
      isDeleted: true,
    });
  } catch {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json(project._id);
});

// @route put /api/project/delete/:id
const unDeleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;
  const workspaceId = req.body.workspaceId;

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    res.status(404);
    throw new Error("workspace not found");
  }
  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  } else {
    workspace.assigned_members.forEach((element) => {
      if (element.member.equals(memberId)) {
        if (!element.isProjectManager) {
          res.status(403);
          throw new Error("you are not allowed to undelete this project");
        }
      }
    });
  }

  let project = {};
  try {
    project = await Project.findByIdAndUpdate(projectId, {
      isDeleted: false,
    });
  } catch {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json(project._id);
});

const abortproject = asyncHandler(async (req, res) => {
  var verif = false;
  const project = await Project.findById(req.params.idproject);
  if (!project) {
    /*if not, error*/
    res.status(400);
    throw new Error("invalid project id");
  } else {
    /*if yes, verify if changes are made by a pm */
    for (let i = 0; i < project.assigned_members.length; i++) {
      if (
        project.assigned_members[i].memberId == req.params.idpm &&
        project.assigned_members[i].isProjectManager == true
      )
        verif = true;
    }
    if (verif) {
      let proj = {};
      var date = new Date();
      proj = await Project.findByIdAndUpdate(
        req.params.idproject,
        {
          endDate: date,
          status: "aborted",
        },
        {
          new: true,
        }
      );
      res.status(200).json(proj);
    } else {
      res.status(401);
      throw new Error("invalid ProjectManager id");
    }
  }
});

const finishproject = asyncHandler(async (req, res) => {
  var verif = false;
  const project = await Project.findById(req.params.idproject);
  if (!project) {
    /*if not, error*/
    res.status(400);
    throw new Error("invalid project id");
  } else {
    /*if yes, verify if changes are made by a pm */
    for (let i = 0; i < project.assigned_members.length; i++) {
      if (
        project.assigned_members[i].memberId == req.params.idpm &&
        project.assigned_members[i].isProjectManager == true
      )
        verif = true;
    }
    if (verif) {
      let proj = {};
      var date = new Date();
      if (project.expectedEndDate >= date) {
        proj = await Project.findByIdAndUpdate(
          req.params.idproject,
          {
            endDate: date,
            status: "finished",
          },
          {
            new: true,
          }
        );
        res.status(200).json(proj);
      } else if (project.expectedEndDate < date) {
        proj = await Project.findByIdAndUpdate(
          req.params.idproject,
          {
            endDate: date,
            status: "finished with delay",
          },
          {
            new: true,
          }
        );
        res.status(200).json(proj);
      }
    } else {
      res.status(401);
      throw new Error("invalid ProjectManager id");
    }
  }
});

// @route put /api/project/assignteamleader/:idproject/:idmember/:idpm
const assignTeamLeader = asyncHandler(async (req, res) => {
  var verif = false;
  var idTeamLeader = null;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idpm &&
      project.assigned_members[i].isProjectManager == true
    )
      verif = true;
    else if (project.assigned_members[i].isTeamLeader == true) {
      idTeamLeader = project.assigned_members[i].memberId;
    }
  }
  if (!verif) {
    res.status(404);
    throw new Error("changes are not made by a PM!");
  } else {
    if (!project) {
      res.status(404);
      throw new Error("project not found");
    } else {
      const member = await Member.findById(req.params.idmember);
      if (!member) {
        res.status(404);
        throw new Error("member not found");
      } else {
        Project.updateOne(
          {
            _id: req.params.idproject,
            "assigned_members.memberId": req.params.idmember,
          },
          {
            $set: {
              "assigned_members.$.isTeamLeader": true,
            },
          },
          function (err, success) {
            if (err) throw err;
            else {
              Project.updateOne(
                {
                  _id: req.params.idproject,
                  "assigned_members.memberId": idTeamLeader,
                },
                {
                  $set: {
                    "assigned_members.$.isTeamLeader": false,
                  },
                },
                function (err, success) {
                  if (err) throw err;
                  else {
                    res.send({ msg: "Assigned new Team Leader" });
                  }
                }
              );
            }
          }
        );
      }
    }
  }
});

const assignNewProjectManager = asyncHandler(async (req, res) => {
  var verif = false;
  var idTeamLeader = null;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idpm &&
      project.assigned_members[i].isProjectManager == true
    )
      verif = true;
    else if (project.assigned_members[i].isTeamLeader == true) {
      idTeamLeader = project.assigned_members[i].memberId;
    }
  }
  if (!verif) {
    res.status(404);
    throw new Error("changes are not made by a PM!");
  } else {
    if (!project) {
      res.status(404);
      throw new Error("project not found");
    } else {
      const member = await Member.findById(req.params.idmember);
      if (!member) {
        res.status(404);
        throw new Error("member not found");
      } else {
        Project.updateOne(
          {
            _id: req.params.idproject,
            "assigned_members.memberId": req.params.idmember,
          },
          {
            $set: {
              "assigned_members.$.isProjectManager": true,
            },
          },
          function (err, success) {
            if (err) throw err;
            else {
              Project.updateOne(
                {
                  _id: req.params.idproject,
                  "assigned_members.memberId": req.params.idpm,
                },
                {
                  $set: {
                    "assigned_members.$.isProjectManager": false,
                  },
                },
                function (err, success) {
                  if (err) throw err;
                  else {
                    res.send({ msg: "Assigned new Project Manager" });
                  }
                }
              );
            }
          }
        );
      }
    }
  }
});

// @route put /api/project/discharge/:idproject/:idmember/:idpm
// idmember : member to discharge
// idpm : id of the current user : is it a pm?
// const dischargeTeamLeader = asyncHandler(async (req, res) => {
//   var verif = false;
//   const project = await Project.findById(req.params.idproject);
//   for (let i = 0; i < project.assigned_members.length; i++) {
//     if (
//       project.assigned_members[i].memberId == req.params.idpm &&
//       project.assigned_members[i].isProjectManager == true
//     )
//       verif = true;
//   }
//   if (!verif) {
//     es.status(404);
//     throw new Error("changes are not made by a PM!");
//   } else {
//     if (!project) {
//       res.status(404);
//       throw new Error("project not found");
//     } else {
//       const member = await Member.findById(req.params.idmember);
//       if (!member) {
//         res.status(404);
//         throw new Error("member not found");
//       } else {
//         Project.updateOne(
//           {
//             _id: req.params.idproject,
//             "assigned_members.memberId": req.params.idmember,
//           },
//           {
//             $set: {
//               "assigned_members.$.isTeamLeader": false,
//             },
//           },
//           function (err, success) {
//             if (err) throw err;
//             else {
//               res.send({ msg: "Discharged TEAMLEADER" });
//             }
//           }
//         );
//       }
//     }
//   }
// });

// @route post /api/project/update/:idproject/:idpm
// you need to provide the required fields in the body
// you need to provide memberId(the member creating the project) in the body

const updateProject = asyncHandler(async (req, res) => {
  var verif = false;
  const project = await Project.findById(req.params.idproject);
  if (!project) {
    /*if not, error*/
    res.status(400);
    throw new Error("invalid project id");
  } else {
    /*if yes, verify if changes are made by a pm */
    for (let i = 0; i < project.assigned_members.length; i++) {
      if (
        project.assigned_members[i].memberId == req.params.idpm &&
        project.assigned_members[i].isProjectManager == true
      )
        verif = true;
    }
    if (verif) {
      const entries = Object.keys(req.body);
      const updates = {};

      // constructing dynamic query : get the informations entered in BODY
      for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i];
      }
      // update workspace fields according to the BODY
      Project.updateOne(
        { _id: req.params.idproject },
        { $set: updates },
        function (err, success) {
          if (err) throw err;
          else {
            res.status(200).json({ project });
          }
        }
      );
    } else {
      res.status(401);
      throw new Error("invalid ProjectManager id");
    }
  }
});

/**
 * @desc invite a list of members to a workspace
 * @var(members,list of member emails )
 * @var(role, so that we can know if the members should be affected as managers or not)
 * @route PUT /api/project/invite-members/:idproject/:idtl
 * idtl : id of current user inviting
 */
const inviteMembers = asyncHandler(async (req, res, next) => {
  var veriff = false;
  const memberids = req.body.members;
  console.log(memberids);
  const project = await Project.findById(req.params.idproject);
  if (!project) {
    res.status(400);
    throw new Error("invalid project id");
  } else {
    for (let i = 0; i < project.assigned_members.length; i++) {
      if (
        project.assigned_members[i].memberId == req.params.idtl &&
        project.assigned_members[i].isTeamLeader == true
      )
        veriff = true;
    }
    if (!veriff) {
      res.status(401);
      throw new Error("invalid TeamLeader id");
    } else {
      for (let i = 0; i < memberids.length; i++) {
        let member = await Member.findOne({ _id: memberids[i].memberId });

        //Member must belong to workspace first
        var belongs = false;
        const wkspId = project.workspace._id;
        const workspaceExist = await Workspace.findById(wkspId);

        for (let i = 0; i < workspaceExist.assigned_members.length; i++) {
          if (workspaceExist.assigned_members[i].member._id.equals(member._id))
            belongs = true;
        }
        if (!belongs) {
          res.status(404);
          throw new Error("user does not belong in workspace");
        } else {
          const invitedMember = {
            memberId: member._id,
          };
          await Project.findOneAndUpdate(
            { _id: req.params.idproject },
            {
              $push: { assigned_members: invitedMember },
            },
            {
              new: true,
            }
          );
        }
      }
      res.status(200).json(req.params.idproject);
    }
  }
});

/**
 * @desc remove a list of members from a project
 * @var(members,list of member ids )
 * @route PUT /api/project/delete-members/:idproject/:idtl
 * idpm : id of current user inviting
 */
const deleteMembers = asyncHandler(async (req, res, next) => {
  var verif = false;
  const userIds = req.body;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idtl &&
      project.assigned_members[i].isTeamLeader == true
    )
      verif = true;
  }

  if (!verif) {
    res.status(404);
    throw new Error("changes are not made by a TL!");
  } else {
    for (let i = 0; i < userIds.length; i++) {
      await Project.findOneAndUpdate(
        { _id: req.params.idproject, "assigned_members.memberId": userIds[i] },
        {
          $set: {
            "assigned_members.$.isDeleted": true,
          },
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json(userIds);
  }
});

/**
 * @desc restore a list of members from a project
 * @var(members,list of member ids )
 * @route PUT /api/project/restore-members/:idproject/:idtl
 * idpm : id of current user inviting
 */
const restoreMembers = asyncHandler(async (req, res, next) => {
  var verif = false;
  const userIds = req.body;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idtl &&
      project.assigned_members[i].isTeamLeader == true
    )
      verif = true;
  }

  if (!verif) {
    res.status(404);
    throw new Error("changes are not made by a TL!");
  } else {
    for (let i = 0; i < userIds.length; i++) {
      await Project.findOneAndUpdate(
        { _id: req.params.idproject, "assigned_members.memberId": userIds[i] },
        {
          $set: {
            "assigned_members.$.isDeleted": false,
          },
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json(userIds);
  }
});

// Check if user exists in Project
// @desc Check if user exists in Project
// @route post /api/project/:projectid/:email
// @access public
const userExistsInProject = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const id = req.params.projectid;
  const project = await Project.findOne({ _id: id });
  const user = await Member.findOne({ email });

  if (project) {
    let matchy = false;
    project.assigned_members.forEach((assignee) => {
      assignee.memberId.equals(user._id) ? (matchy = true) : "";
    });

    if (matchy) res.status(200).json(user);
    else {
      res.status(400);
      throw new Error(
        `User ${user.firstName} ${user.lastName} does not exists in Project`
      );
    }
  } else {
    res.status(400);
    throw new Error(`Project ${id} not found`);
  }
});

module.exports = {
  addProject,
  deleteProject,
  unDeleteProject,
  assignTeamLeader,
  updateProject,
  inviteMembers,
  deleteMembers,
  userExistsInProject,
  getProjects,
  getProjectsByWorkspace,
  getProjectsByManager,
  getProjectsByTeamLeader,
  getProjectsByMember,
  getProject,
  getFullMembersByProject,
  abortproject,
  finishproject,
  assignNewProjectManager,
  restoreMembers,
};
