const express = require("express");
const {
  getProjectsByMemberchatbot,
  getWorkspaceName,
  getProjectName,
  getallUserTasks,
  getUserToDoTasks,
  getUserDoingTasks,
  getUserDoneTasks,
  getUserReviewTasks,
} = require("../controllers/chatbotController");
const router = express.Router();

router.get("/listbymember/:idworkspace/:idmember", getProjectsByMemberchatbot);
router.get("/workspacename/:idworkspace", getWorkspaceName);
router.get("/projectename/:idproject", getProjectName);
router.get("/alltasks/:projectId/:memberId", getallUserTasks);
router.get("/todotasks/:projectId/:memberId", getUserToDoTasks);
router.get("/doingtasks/:projectId/:memberId", getUserDoingTasks);
router.get("/donetasks/:projectId/:memberId", getUserDoneTasks);
router.get("/reviewtasks/:projectId/:memberId", getUserReviewTasks);

module.exports = router;
