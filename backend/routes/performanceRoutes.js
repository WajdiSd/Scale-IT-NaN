const express = require("express");
const {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getLateTasksPercentage,
  getTasksInTimePercentage,
} = require("../controllers/performanceController");
const router = express.Router();

// router.get("/perf/:memberId", getPerformanceByMember);
router.get("/leaderboard-workspace/:workspaceid", getleaderboardbyworkspace);
router.get("/leaderboard-project/:projectid", getleaderboardbyproject);
router.get("/test", test);
router.get("/latetasks/:idproj/:idmember", getLateTasksPercentage);
router.get("/tasksintime/:idproj/:idmember", getTasksInTimePercentage);

module.exports = router;
