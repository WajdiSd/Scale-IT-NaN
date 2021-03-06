const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Task = require("../models/taskModel");
const { MemberInProject } = require("../helpers/functions");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const addTask = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startDate,
    expectedEndDate,
    teamLeadId,
    projectId,
    members,
    prority,
  } = req.body;
  if (!name || !description || !startDate || !expectedEndDate) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  project.assigned_members.forEach((element) => {
    if (element.memberId.equals(teamLeadId)) {
      if (!element.isTeamLeader) {
        res.status(403);
        throw new Error("you are not allowed to create a task");
      }
    }
  });

  const member = await Member.findById(teamLeadId);
  if (!member) {
    res.status(404);
    throw new Error("invalid team leader id");
  }

  const task = await Task.create({
    name,
    description,
    startDate,
    expectedEndDate,
    project: projectId,
    members: members,
    prority: prority,
  }).catch((err) => {
    res.status(400);
    throw new Error("could not create task", err);
  });
  res.status(201).json({ task });
});

const updateTask = asyncHandler(async (req, res) => {
  //const status = req.body;
  const { id, iduser, idproject } = req.params;
  const data = req.body;
  const project = await Project.findById(idproject);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  var isTl = false;
  project.assigned_members.forEach((element) => {
    if (element.memberId == iduser) {
      if (element.isTeamLeader == true) {
        isTl = true;
      }
    }
  });
  if (!isTl) {
    res.status(403);
    throw new Error("you are not allowed to update a task");
  } else {
    const task = await Task.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).catch((err) => {
      res.status(400);
      throw new Error("could not update task", err);
    });
  }
  res.status(201).json({ msg: "task updated successfully" });
});

const updateTaskState = asyncHandler(async (req, res) => {
  const { status, teamLeadId, projectId } = req.body;
  //const { status, projectId } = req.body;
  // TEST 1 :
  //verify if all fields are added
  if (!status || !teamLeadId || !projectId) {
    res.status(400);
    throw new Error("please add all fields");
  }
  // TEST 2 :
  //verify if project exists
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  //TEST 3 :
  //verify if changes are made by a TL
  var isTl = false;
  project.assigned_members.forEach((element) => {
    if (element.memberId == teamLeadId) {
      if (element.isTeamLeader == true) {
        isTl = true;
      }
    }
  });
  //TEST 4 :
  //check if new status is valid
  var possibleStates = ["to_do", "doing", "done", "review"];
  var stateIsValid = possibleStates.includes(status);
  if (!stateIsValid) {
    res.status(404);
    throw new Error("invalid tasks status");
  } else {
    var finishDate = new Date();
    //new taskState == review : task finished yet NOT APPROVED
    if (status == "review") {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          status,
          endDate: finishDate,
        },
        { new: true }
      ).catch((err) => {
        res.status(400);
        throw new Error("could not update task", err);
      });
      res.status(200).json(task);
    } else {
      //new taskState == done : task finished AND approved
      if (status == "done") {
        //only TL can approve a task
        if (!isTl) {
          res.status(403);
          throw new Error("Only teamleader can approve this task");
        } else {
          const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
              status,
            },
            { new: true }
          ).catch((err) => {
            res.status(400);
            throw new Error("could not update task", err);
          });
          res.status(200).json(task);
        }
      } else {
        // new taskState == todo,doing : task NOT FINISHED,endDate = null.
        const task = await Task.findByIdAndUpdate(
          req.params.id,
          {
            status,
            endDate: null,
          },
          { new: true }
        ).catch((err) => {
          res.status(400);
          throw new Error("could not update task", err);
        });
        res.status(200).json(task);
      }
    }
  }
});

//PS: soft delete to keep data
const deleteTask = asyncHandler(async (req, res) => {
  const { teamLeadId, projectId } = req.body;
  if (!teamLeadId || !projectId) {
    res.status(400);
    throw new Error("please add all fields");
  }
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  var isTl = false;
  project.assigned_members.forEach((element) => {
    if (element.memberId == teamLeadId) {
      if (element.isTeamLeader == true) {
        isTl = true;
      }
    }
  });
  if (!isTl) {
    res.status(403);
    throw new Error("you are not allowed to delete a task");
  } else {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: "true" },
      { new: true }
    ).catch((err) => {
      res.status(400);
      throw new Error("could not update task", err);
    });
    res.status(200).json(task);
  }
});

//PS: recover after soft delete, in case its a mistake
const recoverTask = asyncHandler(async (req, res) => {
  const { teamLeadId, projectId } = req.body;
  if (!teamLeadId || !projectId) {
    res.status(400);
    throw new Error("please add all fields");
  }
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  var isTl = false;
  project.assigned_members.forEach((element) => {
    if (element.memberId == teamLeadId) {
      if (element.isTeamLeader == true) {
        isTl = true;
      }
    }
  });
  if (!isTl) {
    res.status(403);
    throw new Error("you are not allowed to recover a task");
  } else {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: "false" },
      { new: true }
    ).catch((err) => {
      res.status(400);
      throw new Error("could not update task", err);
    });
    res.status(200).json(task);
  }
});

// @route get /api/task/getUserTasks/projectId/memberId
const getUserTasks = asyncHandler(async (req, res) => {
  const project = await Project.findById({
    _id: req.params.projectId,
    isDeleted: false,
  });
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }

  let exists = await MemberInProject(req.params.memberId, req.params.projectId);

  if (!exists) {
    res.status(404);
    throw new Error("user is not in project");
  }
  if (req.params.isExecutive) {
    const tasks = await Task.find({
      project: req.params.projectId,
      isDeleted: false,
    }).sort("-startDate");
    res.status(200).json({
      tasks: tasks,
    });
  } else {
    const tasksToDo = await Task.find({
      project: req.params.projectId,
      "members.memberId": req.params.memberId,
      isDeleted: false,
    }).sort("-startDate");
    res.status(200).json({
      tasks: tasksToDo,
    });
  }
});

const getTasksByProject = asyncHandler(async (req, res) => {
  /*const tasksToDo = await Task.find({
    project: req.params.projectid,
    status: "to_do",
  });
  const tasksDoing = await Task.find({
    project: req.params.projectid,
    status: "doing",
  });
  const tasksDone = await Task.find({
    project: req.params.projectid,
    status: "done",
  });
  const tasksReview = await Task.find({
    project: req.params.projectid,
    status: "review",
  });
*/
  const tasks = await Task.find({
    project: req.params.projectid,
    isDeleted: false,
  }).sort("-startDate");
  let columns,
    columnOrder,
    cards = [];
  columns = [
    {
      _id: uuidv4(),
      name: "to_do",
      cardIds: tasks
        .filter((task) => {
          if (task.status == "to_do") return task;
        })
        .map((tasks) => {
          return tasks._id;
        }),
    },
    {
      _id: uuidv4(),
      name: "doing",
      cardIds: tasks
        .filter((task) => {
          if (task.status == "doing") return task;
        })
        .map((tasks) => {
          return tasks._id;
        }),
    },
    {
      _id: uuidv4(),
      name: "review",
      cardIds: tasks
        .filter((task) => {
          if (task.status == "review") return task;
        })
        .map((tasks) => {
          return tasks._id;
        }),
    },
    {
      _id: uuidv4(),
      name: "done",
      cardIds: tasks
        .filter((task) => {
          if (task.status == "done") return task;
        })
        .map((tasks) => {
          return tasks._id;
        }),
    },
  ];
  columnOrder = columns.map((col) => {
    return col._id;
  });

  res.status(200).json({
    cards: tasks,
    columns: columns,
    columnOrder: columnOrder,
  });
});

/**
 * @desc assign a list of members to a task
 * @var(memberEmails,list of member emails )
 * @route PUT /api/task/assign-members/:id
 * id: task id
 */
const assignTaskToMembers = asyncHandler(async (req, res) => {
  const memberEmails = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }
  const projectId = task.project;
  const tobeUpdatedTask = task;
  const alreadyExistingMembers = [];

  const updateTask = async (memberId) =>
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { members: memberId },
      },
      { new: true }
    ).then((task) => Object.assign(tobeUpdatedTask, task));

  const assign = new Promise((resolve, reject) => {
    memberEmails.forEach(async (email, index, array) => {
      const member = await Member.findOne({ email: email });
      if (!member) {
        res.status(400);
        throw new Error(`Member ${email} was not found`);
      }

      const memberId = {
        memberId: member._id,
      };

      const existsInProject = await MemberInProject(
        memberId.memberId,
        projectId
      );
      if (!existsInProject) {
        res.status(400);
        throw new Error(`Member ${member.email} was not found in the project`);
      }

      let existsInTask = false;

      !(task.members.length === 0) &&
        task.members.forEach(async (memberIdInTask) => {
          if (memberIdInTask.memberId.equals(memberId.memberId)) {
            alreadyExistingMembers.push({
              id: member._id,
              email: member.email,
            });
            if (index === array.length - 1) resolve();
            existsInTask = true;
            return;
          }
        });

      if (existsInTask) return;

      updateTask(memberId).then(() =>
        index === array.length - 1 ? resolve() : ""
      );
    });
  });

  assign.then(() => {
    const data = {
      tobeUpdatedTask,
      alreadyExistingMembers,
    };
    return res.status(200).json(data);
  });
});

const removeMemversFromTask = asyncHandler(async (req, res, next) => {
  const { memberIds } = req.body;
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }
  var isTl = false;
  project.assigned_members.forEach((element) => {
    if (element.memberId == req.params.idtl) {
      if (element.isTeamLeader == true) {
        isTl = true;
      }
    }
  });
  if (!isTl) {
    res.status(404);
    throw new Error("changes are not made by a TL!");
  } else {
    for (let i = 0; i < memberIds.length; i++) {
      const t = await Task.findOneAndUpdate(
        { _id: req.params.idtask },
        {
          $pull: { members: { memberId: memberIds[i] } },
        },
        { new: true }
      );
    }
    return res
      .status(200)
      .json({ memberIds: memberIds, taskid: req.params.idtask });
  }
});

const getTaskMembers = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }

  const users = [];

  const getUsers = new Promise(async (resolve, reject) => {
    await task.members.forEach(async (member, index, array) => {
      const user = await Member.findById(member.memberId);
      users.push(user);
      if (index === array.length - 1) resolve();
    });
  });

  getUsers.then(() => {
    return res.status(200).json(users);
  });
});

module.exports = {
  addTask,
  updateTask,
  updateTaskState,
  deleteTask,
  recoverTask,
  getUserTasks,
  getTasksByProject,
  assignTaskToMembers,
  removeMemversFromTask,
  getTaskMembers,
};
