const express = require("express");
const { addTask, updateTask,updateTaskState } = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);
router.put("/update/:id", protect, updateTask);
router.put("/updatestate/:id", updateTaskState);

module.exports = router;
