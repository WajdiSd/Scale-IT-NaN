const express = require("express");
const {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
<<<<<<< HEAD
  getMemberTasksContribution,
  getRankProjectLeaderboard,
  getRankWorkspaceLeaderboard,
=======
  getLateTasksPercentage,
>>>>>>> 4d039d953bc7618da1f8ca8990c74e534795be99
} = require("../controllers/performanceController");
const router = express.Router();

// router.get("/perf/:memberId", getPerformanceByMember);
router.get("/leaderboard-workspace/:workspaceid", getleaderboardbyworkspace);
router.get("/leaderboard-project/:projectid", getleaderboardbyproject);
router.get("/test", test);
<<<<<<< HEAD
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
=======
router.get("/latetasks/:idproj/:idmember", getLateTasksPercentage);
>>>>>>> 4d039d953bc7618da1f8ca8990c74e534795be99

module.exports = router;
