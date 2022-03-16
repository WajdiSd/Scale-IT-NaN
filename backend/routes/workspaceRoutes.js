const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWksp,
  getWorkspaces,
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add/:idmember", addWorkspace);
router.put("/update/:id", updateWksp);
router.get("/:id", getWorkspaces);

module.exports = router;
