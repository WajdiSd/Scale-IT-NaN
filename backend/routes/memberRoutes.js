const express = require("express");
const router = express.Router();
const {
  registerMember,
  loginMember,
  verifyMember,
  getMe,
  recoverPwdViaMail,
  recoverPwdViaSms,
  verifyCode,
  updatepwd,
  deleteUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/memberController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerMember);
router.put("/verify/:id", verifyMember);
router.put("/updateUserPassword/:id", protect, updateUserPassword);
router.post("/login", loginMember);
router.get("/me", protect, getMe);

//Reset Password
router.post("/recoverPwdViaMail", recoverPwdViaMail);
router.post("/recoverPwdViaSms", recoverPwdViaSms);
router.post("/verifyCode/:verifcode", verifyCode);
router.post("/updatepwd/:email", updatepwd);

//CRUD user (update/delete)
router.put("/deleteaccount/:iduser", protect, deleteUser);
router.post("/updateaccount/:iduser", updateUser);

module.exports = router;
