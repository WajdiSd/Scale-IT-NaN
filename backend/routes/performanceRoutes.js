const express = require("express");
const {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getMemberTasksContribution,
} = require("../controllers/performanceController");
const router = express.Router();

// router.get("/perf/:memberId", getPerformanceByMember);
router.get("/leaderboard-workspace/:workspaceid", getleaderboardbyworkspace);
router.get("/leaderboard-project/:projectid", getleaderboardbyproject);
router.get("/test", test);
router.get(
  "/getcontribbution/:projectId/:memberId",
  getMemberTasksContribution
);

module.exports = router;
