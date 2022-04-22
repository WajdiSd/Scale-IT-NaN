const express = require("express");
const {
  getPerformanceByMember,
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getScoreProject,
  getScoreWorkspace,
  getAllFinishedProjectsInTimePourcentage,
  getAllFinishedProjectsLatePourcentage,
} = require("../controllers/performanceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/perf/:memberId", getPerformanceByMember);
router.get("/leaderboard-workspace/:workspaceid", getleaderboardbyworkspace);
router.get("/leaderboard-project/:projectid", getleaderboardbyproject);
router.get("/test", test);
router.get("/scorebyproject/:memberid/:projectid", getScoreProject);
router.get("/scorebyworkspace/:memberid/:workspaceid", getScoreWorkspace);
router.get("/finished-projects-in-time-pourcentage/:workspaceid",protect, getAllFinishedProjectsInTimePourcentage);
router.get("/finished-projects-late-pourcentage/:workspaceid", protect, getAllFinishedProjectsLatePourcentage);

module.exports = router;
