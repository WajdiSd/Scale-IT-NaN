const express = require("express");
const {
  addProject,
  deleteProject,
  unDeleteProject,
  assignTeamLeader,
  updateProject,
  dischargeTeamLeader,
  inviteMembers,
  deleteMembers,
  getProjects,
  getProjectsByWorkspace,
  getProjectsByManager,
  getProjectsByMember,
  getProjectsByTeamLeader,
} = require("../controllers/projectController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.get("/list", protect, getProjects);
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
router.get(
  "/listbymember/:idworkspace/:idmember",
  protect,
  getProjectsByMember
);

router.post("/add", protect, addProject);
router.put("/delete/:id", protect, deleteProject);
router.put("/undelete/:id", protect, unDeleteProject);

router.put("/assignteamleader/:id", protect, assignTeamLeader);
router.put(
  "/dischargeteamleader/:idproject/:idmember/:idpm",
  protect,
  dischargeTeamLeader
);

router.put("/update/:idproject/:idpm", protect, updateProject);
router.put("/invite-members/:idproject/:idtl", protect, inviteMembers);
router.put("/delete-members/:idproject/:idtl", protect, deleteMembers);

module.exports = router;
