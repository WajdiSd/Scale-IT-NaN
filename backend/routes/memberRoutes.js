const express = require("express");
const router = express.Router();
const {
  registerMember,
  loginMember,
  verifyMember,
  getMe,
} = require("../controllers/memberController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerMember);
router.post("/verify/:id", verifyMember);
router.post("/login", loginMember);
router.get("/me", protect, getMe);

module.exports = router;
