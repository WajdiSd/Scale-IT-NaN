const express = require("express");
const {
  getProjectsByMemberchatbot,
} = require("../controllers/chatbotController");
const router = express.Router();

router.get("/listbymember/:idworkspace/:idmember", getProjectsByMemberchatbot);

module.exports = router;
