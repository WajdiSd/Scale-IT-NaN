const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWorkspace,
  getWorkspaces,
  removeMemberFromWorkspace,
  assignProjectManager,
  deleteProjectManager
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add/:idmember", addWorkspace);
router.put("/update/:id", updateWorkspace);
router.get("/:id", getWorkspaces);
router.put("/removemember/:idmember/:idworkspace", removeMemberFromWorkspace);
router.put("/assignPM/:idworkspace/:idmember", assignProjectManager);
router.put("/deletePM/:idworkspace/:idmember", deleteProjectManager);

module.exports = router;
