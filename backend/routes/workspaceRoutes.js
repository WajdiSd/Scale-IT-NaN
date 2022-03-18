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
<<<<<<< HEAD
  getWorkspaceById,
=======
  inviteManyMembers,
>>>>>>> 6af6283541f1244db77b09d5184b9a705a91b101
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addWorkspace);
router.put("/invite-member/:id", inviteOneMember);
router.put("/invite-members/:id", inviteManyMembers);

router.post("/add/:idmember", addWorkspace);
router.put("/update/:idworkspace/:idhr", updateWorkspace);
router.get("/:idmember", getWorkspaces);
<<<<<<< HEAD
router.get("/details/:id", getWorkspaceById);
=======
router.put("/removemember/:idmember/:idworkspace", removeMemberFromWorkspace);
router.get("/fetch-users/:idworkspace", fetchUsersByWorkspace);

router.put("/deleteworkspace/:idworkspace", deleteWorkspace);
>>>>>>> 6af6283541f1244db77b09d5184b9a705a91b101
router.put(
  "/removemember/:idmember/:idworkspace/:idhr",
  removeMemberFromWorkspace
);
router.put("/assignPM/:idworkspace/:idmember/:idhr", assignProjectManager);
router.put("/deletePM/:idworkspace/:idmember/:idhr", deleteProjectManager);
router.put("/deleteworkspace/:idworkspace/:idhr", deleteWorkspace);
module.exports = router;
