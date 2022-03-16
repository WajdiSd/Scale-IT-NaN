const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWorkspace,
  getWorkspaces,
  removeMemberFromWorkspace,
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add/:idmember", addWorkspace);
router.put("/update/:id", updateWorkspace);
router.get("/:id", getWorkspaces);
router.put("/removemember/:idmember/:idworkspace", removeMemberFromWorkspace);

module.exports = router;
