const express = require("express");
const {
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getMemberTasksContribution,
  getRankProjectLeaderboard,
  getRankWorkspaceLeaderboard,
  getLateTasksPercentage,
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

router.get(
  "/getrankprojectleaderboard/:projectid/:memberId",
  getRankProjectLeaderboard
);

router.get(
  "/getrankworkspaceleaderboard/:workspaceid/:memberId",
  getRankWorkspaceLeaderboard
);

router.get("/latetasks/:idproj/:idmember", getLateTasksPercentage);

module.exports = router;
