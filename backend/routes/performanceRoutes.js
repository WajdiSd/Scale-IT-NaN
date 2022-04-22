const express = require("express");
const {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getMemberTasksContribution,
  getRankProjectLeaderboard,
  getRankWorkspaceLeaderboard,
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

module.exports = router;
