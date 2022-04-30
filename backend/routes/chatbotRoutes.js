const express = require("express");
const {
  getProjectsByMemberchatbot,
  getWorkspaceName,
} = require("../controllers/chatbotController");
const router = express.Router();

router.get("/listbymember/:idworkspace/:idmember", getProjectsByMemberchatbot);
router.get("/workspacename/:idworkspace", getWorkspaceName);

module.exports = router;
