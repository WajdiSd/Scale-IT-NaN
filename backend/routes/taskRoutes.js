const express = require("express");
const { addTask, updateTask } = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);
router.put("/update/:id", updateTask);

module.exports = router;
