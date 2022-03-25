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
  getProject,
  getFullMembersByProject,
} = require("../controllers/projectController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.get("/get/:id/:iduser", protect, getProject);
router.get("/list", protect, getProjects);
router.get("/get/:id", protect, getProject);
<<<<<<< HEAD
router.get("/list", getProjects);
=======
>>>>>>> 5d2252d440495ede3eeb40e3f8807f9f157a2bdd
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
router.get("/list/fullmembers/:idproject", protect, getFullMembersByProject);

router.post("/add", protect, addProject);
router.put("/delete/:id", protect, deleteProject);
router.put("/undelete/:id", protect, unDeleteProject);

router.put(
  "/assignteamleader/:idproject/:idmember/:idpm",
  protect,
  assignTeamLeader
);

<<<<<<< HEAD
router.put("/update/:idproject/:idpm",  protect, updateProject);
router.put("/invite-members/:idproject/:idtl", inviteMembers);
router.put("/delete-members/:idproject/:idtl", deleteMembers);
=======
router.put("/update/:idproject/:idpm", protect, updateProject);
router.put("/invite-members/:idproject/:idtl", protect, inviteMembers);
router.put("/delete-members/:idproject/:idtl", protect, deleteMembers);
>>>>>>> 5d2252d440495ede3eeb40e3f8807f9f157a2bdd

module.exports = router;
