const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const { ProjectHasTeamLeader } = require("../helpers/functions");
// @route post /api/project/add/
// you need to provide the required fields in the body
// you need to provide memberId(the member creating the project) in the body
const addProject = asyncHandler(async (req, res) => {
  const { name, description, startDate, expectedEndDate, memberId } = req.body;
  if (!name || !description || !startDate || !expectedEndDate) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const projectManager = {
    memberId: memberId,
    isProjectManager: true,
  };

  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("something is wrong with the member");
  }
  const project = await Project.create({
    name,
    description,
    startDate,
    expectedEndDate,
    assigned_members: [projectManager],
  }).catch((err) => {
    res.status(400);
    throw new Error("could not create project", err);
  });
  res.status(201).json({ project });
});

// @route put /api/project/delete/:id
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findByIdAndUpdate(projectId, {
    isDeleted: true,
  });
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json("project deleted");
});

// @route put /api/project/delete/:id
const unDeleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findByIdAndUpdate(projectId, {
    isDeleted: false,
  });
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  res.status(200).json("project deleted");
});

// @route put /api/project/assignteamleader/:id
const assignTeamLeader = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("member not found");
  }
  if(ProjectHasTeamLeader(projectId)){ // a project necessarily has ONLY ONE team leader
    res.status(400);
    throw new Error("project already has a team leader");
  }
  const teamLeader = {
    memberId: memberId,
    isTeamLeader: true,
  };
  project.assigned_members.push(teamLeader);
  project.save();
  res.status(200).json("team leader assigned");
});

// @route put /api/project/discharge/:idproject/:idmember/:idpm
// idmember : member to discharge
// idpm : id of the current user : is it a pm?
const dischargeTeamLeader = asyncHandler(async (req, res) => {
  var verif = false;
  const project = await Project.findById(req.params.idproject);
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idpm &&
      project.assigned_members[i].isProjectManager == true
    )
      verif = true;
    }
  if (!verif)
    {es.status(404);
      throw new Error("changes are not made by a PM!");}
  else {
      if (!project) {
        res.status(404);
        throw new Error("project not found");
      }
     else {
       const member = await Member.findById(req.params.idmember);
        if (!member) {
            res.status(404);
            throw new Error("member not found");
        }
        else {

          Project.updateOne(
            {
              _id: req.params.idproject,
              "assigned_members.memberId": req.params.idmember,
            },
            {
              $set: {
                "assigned_members.$.isTeamLeader": false,
              },
            },
            function (err, success) {
              if (err) throw err;
              else {
                res.send({ msg: "Discharged TEAMLEADER" });
              }
            }
          );

        }
      }
    }
});

// @route post /api/project/update/:idproject/:idpm
// you need to provide the required fields in the body
// idpm : the id of the user doing the current changes
const updateProject = asyncHandler(async (req, res) => {
 
  var verif = false;
  //Step 1 : Verify if the project is valid
  const project = await Project.findById(req.params.idproject);
  if (!project) {
    /*if not, error*/
    res.status(400);
    throw new Error("invalid project id");
  } else {
    /*if yes, moving to step 2 : verify if changes are made by a pm */
    for (let i = 0; i < project.assigned_members.length; i++) {
      if (
        project.assigned_members[i].memberId == req.params.idpm &&
        project.assigned_members[i].isProjectManager == true
      )
        verif = true;
      } //if its a pm,
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
                res.status(201).json({ project });
              }
            }
          );
        }
        //if its not a pm
        else {
          res.status(401);
          throw new Error("invalid ProjectManager id");
        }

  
  
  }
});

/**
 * @desc invite a list of members to a project
 * @route PUT /api/project/invite-members/:idproject/:idtl
 * idtl : id of current user inviting, has to be a teamleader
 * idproject : the project you want to add members to
 * you have to provide a list of emails in the BODY
 * PS: you can provide only one email, but it has to be in a list.
 */
 const inviteMembers= asyncHandler(async (req, res, next) => {
   //Step 1: get the emails
  const emails = req.body.emails;
  //Step 2 : get the project 
  const project = await Project.findById(req.params.idproject);
  //Step 3 : check 
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idtl &&
      project.assigned_members[i].isTeamLeader == true
    )
      verif = true;
    }
    
  if (!verif)
    {es.status(404);
      throw new Error("changes are not made by a PM!");}
  else {
            for (let i = 0; i < emails.length; i++) {
              let member = await Member.findOne({ email: emails[i] });
                const invitedMember = {
                  memberId: member._id
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
            return res.status(200).json(emails);}
});


/**
 * @desc delete a list of members from project
 * @var(members,list of member emails )
 * @route PUT /api/project/invite-members/:idproject/:idtl
 * idtl : id of current user inviting
 */
 const deleteMembers= asyncHandler(async (req, res, next) => {
   //Step 1 : get the emails from BODY
  const emails = req.body.emails;
  //Step2 : find the project 
  const project = await Project.findById(req.params.idproject);
  //Step 3 : check if current user doing the changes is a TeamLeader
  for (let i = 0; i < project.assigned_members.length; i++) {
    if (
      project.assigned_members[i].memberId == req.params.idtl &&
      project.assigned_members[i].isTeamLeader == true
    )
      verif = true;
    }
  //If its not a TL *teamleader*
  if (!verif)
    {es.status(404);
      throw new Error("changes are not made by a PM!");}
  //If it is a TL
  else {
            for (let i = 0; i < emails.length; i++) {
              let member = await Member.findOne({ email: emails[i] });
                const invitedMember = {
                  memberId: member._id
                  };
                await Project.findOneAndUpdate(
                  { _id: req.params.idproject },
                  {
                    $pull: { assigned_members: invitedMember },
                  },
                  {
                    new: true,
                  }
                );
              
            }
            return res.status(200).json(emails);}
});


module.exports = {
  addProject,
  deleteProject,
  unDeleteProject,
  assignTeamLeader,
  updateProject,
  dischargeTeamLeader,
  inviteMembers,
  deleteMembers
};
