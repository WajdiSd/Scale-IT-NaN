const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWorkspace,
  inviteOneMember,
  getWorkspaces,
  removeMemberFromWorkspace,
  fetchUsersByWorkspace
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addWorkspace);
router.put("/invite-member/:id", inviteOneMember);

router.post("/add/:idmember", addWorkspace);
router.put("/update/:id", updateWorkspace);
router.get("/:id", getWorkspaces);
router.put("/removemember/:idmember/:idworkspace", removeMemberFromWorkspace);
router.get("/fetch-users/:idworkspace", fetchUsersByWorkspace);

module.exports = router;
