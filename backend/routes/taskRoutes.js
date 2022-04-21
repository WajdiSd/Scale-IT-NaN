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
  removeMemversFromTask,
  getTaskMembers,
} = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);
router.put("/update/:id/:idproject/:iduser", protect, updateTask);
router.put("/updatestate/:id", updateTaskState);
router.put("/assign-members/:id", assignTaskToMembers);
router.put("/delete/:id", protect, deleteTask);
router.put("/recover/:id", protect, recoverTask);
router.get(
  "/getUserTasks/:projectId/:memberId/:isExecutive",
  protect,
  getUserTasks
);
router.get("/tasksbyproject/:projectid", getTasksByProject);
router.get("/:id/members", protect, getTaskMembers);
router.put("/remove-members/:projectId/:idtask/:idtl", removeMemversFromTask);

module.exports = router;
