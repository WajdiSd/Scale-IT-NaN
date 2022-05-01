const express = require("express");
const {
  getProjectsByMemberchatbot,
  getWorkspaceName,
  getProjectName,
} = require("../controllers/chatbotController");
const router = express.Router();

router.get("/listbymember/:idworkspace/:idmember", getProjectsByMemberchatbot);
router.get("/workspacename/:idworkspace", getWorkspaceName);
router.get("/projectename/:idproject", getProjectName);

module.exports = router;
