const express = require("express");
const { addTask } = require("../controllers/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addTask);

module.exports = router;
