const express = require("express");
const {
  getleaderboardbyworkspace,
  getleaderboardbyproject,
  test,
  getScoreProject,
  getScoreWorkspace,
  getAllFinishedProjectsInTimePourcentage,
  getAllFinishedProjectsLatePourcentage,
  getMemberTasksContribution,
  getRankProjectLeaderboard,
  getRankWorkspaceLeaderboard,
  getLateTasksPercentage,
  getTasksInTimePercentage,
  getLateProjectsPercentage,
  getProjectsInTimePercentage,
  roleinworkspace,
  getAllTasksInTimePercentage,
  getAllLateTasksPercentage,
  roleinproject,
  getprojectprogress,
  getnbrtasksleft,
} = require("../controllers/performanceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/perf/:memberId", getPerformanceByMember);
router.get("/leaderboard-workspace/:workspaceid", getleaderboardbyworkspace);
router.get("/leaderboard-project/:projectid", getleaderboardbyproject);
router.get("/test", test);
router.get("/scorebyproject/:memberid/:projectid", getScoreProject);
router.get("/scorebyworkspace/:memberid/:workspaceid", getScoreWorkspace);
router.get(
  "/finished-projects-in-time-pourcentage/:workspaceid",
  protect,
  getAllFinishedProjectsInTimePourcentage
);
router.get(
  "/finished-projects-late-pourcentage/:workspaceid",
  protect,
  getAllFinishedProjectsLatePourcentage
);

router.get(
  "/getcontribbution/:projectId/:memberId",
  getMemberTasksContribution
);

router.get("/getnbrtasksleft/:idproj/:idmember", getnbrtasksleft);

router.get(
  "/getrankprojectleaderboard/:projectid/:memberId",
  getRankProjectLeaderboard
);

router.get(
  "/getrankworkspaceleaderboard/:workspaceid/:memberId",
  getRankWorkspaceLeaderboard
);

router.get("/latetasks/:idproj/:idmember", getLateTasksPercentage);
router.get("/tasksintime/:idproj/:idmember", getTasksInTimePercentage);
router.get("/lateprojects/:idworkspace/:idmember", getLateProjectsPercentage);
router.get(
  "/projectsintime/:idworkspace/:idmember",
  getProjectsInTimePercentage
);

router.get("/roleinworkspace/:idworkspace/:idmember", roleinworkspace);
router.get("/roleinproject/:idproject/:idmember", roleinproject);

router.get("/alllatetasks/:idproj", getAllLateTasksPercentage);
router.get("/alltasksintime/:idproj", getAllTasksInTimePercentage);
router.get("/projectprogress/:idproj", getprojectprogress);

module.exports = router;
