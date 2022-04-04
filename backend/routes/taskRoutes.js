const express = require("express");
const {
  addTask,
  updateTask,
  updateTaskState,
  deleteTask,
  recoverTask,
  assignTaskToMembers,
} = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);
router.put("/update/:id/:idproject/:iduser", protect, updateTask);
router.put("/updatestate/:id", protect, updateTaskState);
router.put("/assign-members/:id", protect, assignTaskToMembers);
router.put("/delete/:id", protect, deleteTask);
router.put("/recover/:id", protect, recoverTask);

module.exports = router;
