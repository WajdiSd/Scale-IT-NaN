const express = require("express");
const router = express.Router();
const {
  registerMember,
  loginMember,
  getMe,
  recoverPwdViaMail,
  recoverPwdViaSms,
  verifyCode,
  updatepwd,
} = require("../controllers/memberController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerMember);
router.post("/login", loginMember);
router.get("/me", protect, getMe);

//Reset Password
router.post("/recoverPwdViaMail", recoverPwdViaMail);
router.post("/recoverPwdViaSms", recoverPwdViaSms);
router.post("/verifyCode/:verifcode", verifyCode);
router.post("/updatepwd/:email", updatepwd);




module.exports = router;
