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
  resendEmail,
  checkIfUserExistsByEmail,
  getConnectedUser,
} = require("../controllers/memberController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerMember);
router.put("/verify/:id", verifyMember);
router.post("/resendEmail/:id", resendEmail);
router.put("/updateUserPassword/:email", protect, updateUserPassword);
router.post("/login", loginMember);
router.get("/me", protect, getMe);

//Reset Password
router.post("/recoverPwdViaMail", recoverPwdViaMail);
router.post("/recoverPwdViaSms", recoverPwdViaSms);
router.put("/verifyCode/:verifcode", verifyCode);
router.put("/updatepwd/:email", updatepwd);

//CRUD user (update/delete)
router.put("/deleteaccount/:iduser", protect, deleteUser);
router.put("/updateaccount/:iduser", protect, updateUser);

//Check if Exists
router.get("/user/:email", protect, checkIfUserExistsByEmail);

router.get("/connecteduser/:id", getConnectedUser);

module.exports = router;
