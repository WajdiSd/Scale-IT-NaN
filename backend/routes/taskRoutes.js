const express = require("express");
const { addTask, updateTask,updateTaskState, deleteTask, recoverTask, getUserTasks } = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);
router.put("/update/:id", protect, updateTask);
router.put("/updatestate/:id", protect, updateTaskState);
router.put("/delete/:id", protect, deleteTask);
router.put("/recover/:id", protect, recoverTask);
router.get("/getUserTasks/:projectId/:memberId", protect, getUserTasks);

module.exports = router;