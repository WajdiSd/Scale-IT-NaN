const express = require("express");
const {
  addTask,
  updateTask,
  updateTaskState,
  deleteTask,
  recoverTask,
  getTasksByProject,
  assignTaskToMembers,
  getUserTasks,
} = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);
router.put("/update/:id/:idproject/:iduser", protect, updateTask);
router.put("/updatestate/:id", updateTaskState);
router.put("/assign-members/:id", protect, assignTaskToMembers);
router.put("/delete/:id", protect, deleteTask);
router.put("/recover/:id", protect, recoverTask);
router.get("/getUserTasks/:projectId/:memberId/:isExecutive", protect, getUserTasks);
router.get("/tasksbyproject/:projectid", getTasksByProject);

module.exports = router;