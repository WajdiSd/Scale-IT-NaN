const express = require("express");
<<<<<<< HEAD
const { addTask, updateTask,updateTaskState, deleteTask, recoverTask, getUserTasks } = require("../controllers/taskController");
=======
const {
  addTask,
  updateTask,
  updateTaskState,
  deleteTask,
  recoverTask,
  getTasksByProject,
  assignTaskToMembers,
} = require("../controllers/taskController");
>>>>>>> 44aaf684485a83bc84ea284771a70cb51470ab0e

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);
router.put("/update/:id/:idproject/:iduser", protect, updateTask);
router.put("/updatestate/:id", protect, updateTaskState);
router.put("/assign-members/:id", protect, assignTaskToMembers);
router.put("/delete/:id", protect, deleteTask);
router.put("/recover/:id", protect, recoverTask);
<<<<<<< HEAD
router.get("/getUserTasks/:projectId/:memberId", protect, getUserTasks);
=======
router.get("/tasksbyproject/:projectid", getTasksByProject);
>>>>>>> 44aaf684485a83bc84ea284771a70cb51470ab0e

module.exports = router;