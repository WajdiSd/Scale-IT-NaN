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
  getWorkspaceById,
  inviteManyMembers,
  countWkspMembers,
  assignRatestoMember,
  checkIfUserExistsInWorkspace,
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addWorkspace);
router.put("/invite-member/:id", inviteOneMember);
router.put("/invite-members/:id", inviteManyMembers);

router.post("/add/:idmember", addWorkspace);
router.put("/update/:idworkspace/:idhr", updateWorkspace);
router.get("/:idmember", getWorkspaces);
router.get("/details/:id", getWorkspaceById);
router.put("/removemember/:idmember/:idworkspace", removeMemberFromWorkspace);
router.get("/fetch-users/:idworkspace", fetchUsersByWorkspace);

// Check if user exists in workspace /api/workspace/:workspaceid/:email
router.get("/:workspaceid/:email", checkIfUserExistsInWorkspace);

router.put(
  "/removemember/:idmember/:idworkspace/:idhr",
  removeMemberFromWorkspace
);
router.put("/assignPM/:idworkspace/:idmember/:idhr", assignProjectManager);
router.put("/deletePM/:idworkspace/:idmember/:idhr", deleteProjectManager);
router.put("/deleteworkspace/:idworkspace/:idhr", deleteWorkspace);
router.put(
  "/asignratestomember/:idworkspace/:idhr/:idmember",
  assignRatestoMember
);
router.get("/countmembers/:idworkspace", countWkspMembers);

module.exports = router;
