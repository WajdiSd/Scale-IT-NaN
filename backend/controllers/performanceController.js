const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Task = require("../models/taskModel");

const getPerformanceByMember = asyncHandler(async (req, res) => {
  const task = await Task.find({
    "members.memberId": req.params.memberId,
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

  console.log("ftfe", ftfe);
  console.log("fcit", fcit);
  console.log("fcfaster", fcfaster);
  console.log("ftat", ftat);
  console.log("ftit", ftit);
  console.log("fcat", fcat);

  res.status(200).json({
    msg: "zzezez",
  });
});

module.exports = {
  getPerformanceByMember,
};
