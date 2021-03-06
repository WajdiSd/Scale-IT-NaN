const express = require("express");
const {
  addProject,
  deleteProject,
  unDeleteProject,
  assignTeamLeader,
  updateProject,
  abortproject,
  finishproject,
  inviteMembers,
  deleteMembers,
  getProjects,
  getProjectsByWorkspace,
  getProjectsByManager,
  getProjectsByMember,
  getProjectsByTeamLeader,
  getProject,
  getFullMembersByProject,
  assignNewProjectManager,
  userExistsInProject,
  restoreMembers,
} = require("../controllers/projectController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.get("/get/:id/:iduser", protect, getProject);
router.get("/list", getProjects);
router.get("/get/:id", getProject);
router.get("/list", getProjects);
router.get("/list/:idworkspace", protect, getProjectsByWorkspace);
router.get(
  "/listbymanager/:idworkspace/:idmember",
  protect,
  getProjectsByManager
);
router.get(
  "/listbyteamleader/:idworkspace/:idmember",
  protect,
  getProjectsByTeamLeader
);
router.get("/listbymember/:idworkspace/:idmember", getProjectsByMember);
router.get("/list/fullmembers/:idproject", protect, getFullMembersByProject);

router.post("/add", protect, addProject);
router.put("/delete/:id", protect, deleteProject);
router.put("/undelete/:id", protect, unDeleteProject);

router.put(
  "/assignteamleader/:idproject/:idmember/:idpm",
  protect,
  assignTeamLeader
);

router.put(
  "/assignnewpm/:idproject/:idmember/:idpm",
  protect,
  assignNewProjectManager
);

router.put("/abortproject/:idproject/:idpm", protect, abortproject);

router.put("/finishproject/:idproject/:idpm", protect, finishproject);

router.put("/update/:idproject/:idpm", protect, updateProject);

router.put("/invite-members/:idproject/:idtl", protect, inviteMembers);

router.put("/delete-members/:idproject/:idtl", protect, deleteMembers);

router.put("/restore-members/:idproject/:idtl", protect, restoreMembers);

router.get("/:projectid/:email", protect, userExistsInProject);

module.exports = router;
