const express = require("express");
const { addTask, updateTask,updateTaskState } = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addTask);
router.put("/update/:id", updateTask);
router.put("/updatestate/:id", updateTaskState);

module.exports = router;
