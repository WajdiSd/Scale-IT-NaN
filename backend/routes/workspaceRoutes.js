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
  assignHR,
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addWorkspace);
router.put("/invite-members/:id", protect, inviteManyMembers);

router.post("/add/:idmember", protect, addWorkspace);
router.put("/update/:idworkspace/:idhr", protect, updateWorkspace);
router.get("/:idmember", getWorkspaces);
router.get("/details/:id", protect, getWorkspaceById);
router.get("/fetch-users/:idworkspace", protect, fetchUsersByWorkspace);

// Check if user exists in workspace /api/workspace/:workspaceid/:email
router.get("/:workspaceid/:email", checkIfUserExistsInWorkspace);

router.put(
  "/removemember/:idmember/:idworkspace/:idhr",
  protect,
  removeMemberFromWorkspace
);
router.put(
  "/assignPM/:idworkspace/:idmember/:idhr",
  assignProjectManager
);
router.put(
  "/deletePM/:idworkspace/:idmember/:idhr",
  protect,
  deleteProjectManager
);
router.put("/deleteworkspace/:idworkspace/:idhr", protect, deleteWorkspace);
router.put(
  "/asignratestomember/:idworkspace/:idhr/:idmember",
  protect,
  assignRatestoMember
);
router.get("/countmembers/:idworkspace", protect, countWkspMembers);
router.put(
  "/assignHR/:idworkspace/:idmember/:idhr", 
  protect,
  assignHR
);

module.exports = router;
