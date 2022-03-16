const express = require("express");
const router = express.Router();
const {
  addWorkspace,
  updateWksp
} = require("../controllers/workspaceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addWorkspace);
router.put("/update/:id", updateWksp);


module.exports = router;
