const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWksp,
  inviteOneMember
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addWorkspace);
router.put("/update/:id", updateWksp);
router.put("/invite-member/:id", inviteOneMember);


module.exports = router;
