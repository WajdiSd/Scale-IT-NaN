const express = require("express");
const {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
} = require("../controllers/performanceController");
const router = express.Router();

router.get("/perf/:memberId", getPerformanceByMember);
router.get("/leaderboard-workspace/:workspaceid", getleaderboardbyworkspace);
router.get("/leaderboard-project/:projectid", getleaderboardbyproject);

module.exports = router;
