const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWorkspace,
  inviteOneMember,
  getWorkspaces,
  removeMemberFromWorkspace,
  fetchUsersByWorkspace,
  assignProjectManager,
  deleteProjectManager,
  deleteWorkspace,
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addWorkspace);
router.put("/invite-member/:id", inviteOneMember);

router.post("/add/:idmember", addWorkspace);
router.put("/update/:idworkspace/:idhr", updateWorkspace);
router.get("/:idmember", getWorkspaces);
router.put("/removemember/:idmember/:idworkspace", removeMemberFromWorkspace);
router.get("/fetch-users/:idworkspace", fetchUsersByWorkspace);

router.put("/deleteworkspace/:idworkspace", deleteWorkspace);
router.put(
  "/removemember/:idmember/:idworkspace/:idhr",
  removeMemberFromWorkspace
);
router.put("/assignPM/:idworkspace/:idmember", assignProjectManager);
router.put("/deletePM/:idworkspace/:idmember", deleteProjectManager);
router.put("/deleteworkspace/:idworkspace/:idhr", deleteWorkspace);
module.exports = router;
