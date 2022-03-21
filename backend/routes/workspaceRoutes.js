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
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addWorkspace);
router.put("/invite-members/:id", protect, inviteManyMembers);

router.post("/add/:idmember", protect, addWorkspace);
router.put("/update/:idworkspace/:idhr",protect, updateWorkspace);
router.get("/:idmember", protect, getWorkspaces);
router.get("/details/:id", protect, getWorkspaceById);
router.put("/removemember/:idmember/:idworkspace", protect, removeMemberFromWorkspace);
router.get("/fetch-users/:idworkspace", protect, fetchUsersByWorkspace);

router.put(
  "/removemember/:idmember/:idworkspace/:idhr",
  protect, removeMemberFromWorkspace
);
router.put("/assignPM/:idworkspace/:idmember/:idhr", protect, assignProjectManager);
router.put("/deletePM/:idworkspace/:idmember/:idhr", protect, deleteProjectManager);
router.put("/deleteworkspace/:idworkspace/:idhr", protect, deleteWorkspace);
router.put(
  "/asignratestomember/:idworkspace/:idhr/:idmember",
  protect, assignRatestoMember
);
router.get("/countmembers/:idworkspace", protect, countWkspMembers);

module.exports = router;
