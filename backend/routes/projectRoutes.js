const express = require("express");
const { addProject, deleteProject, unDeleteProject, assignTeamLeader } = require("../controllers/projectController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
router.post("/add", addProject);
router.put("/delete/:id", deleteProject);
router.put("/undelete/:id", unDeleteProject);

router.put("/assignteamleader/:id",assignTeamLeader);

module.exports = router;
