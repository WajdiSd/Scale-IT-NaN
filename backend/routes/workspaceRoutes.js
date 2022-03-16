const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWorkspace,
  getWorkspaces,
  removeMemberFromWorkspace,
  assignProjectManager,
  deleteProjectManager,
  deleteWorkspace,
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add/:idmember", addWorkspace);
router.put("/update/:id", updateWorkspace);
router.get("/:idmember", getWorkspaces);
router.put("/removemember/:idmember/:idworkspace", removeMemberFromWorkspace);
router.put("/assignPM/:idworkspace/:idmember", assignProjectManager);
router.put("/deletePM/:idworkspace/:idmember", deleteProjectManager);
router.put("/deleteworkspace/:idworkspace", deleteWorkspace);
module.exports = router;
