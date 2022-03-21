const express = require("express");
const { addProject, deleteProject, unDeleteProject, 
    assignTeamLeader,updateProject,dischargeTeamLeader,
    inviteMembers,deleteMembers, getProjects, getProjectsByWorkspace, getProjectsByManager, getProjectsByMember, getProjectsByTeamLeader } = require("../controllers/projectController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.get("/list", getProjects);
router.get("/list/:idworkspace", getProjectsByWorkspace);
router.get("/listbymanager/:idworkspace/:idmember",getProjectsByManager);
router.get("listbyteamleader/:idworkspace/:idmember",getProjectsByTeamLeader);
router.get("/listbymember/:idworkspace/:idmember",getProjectsByMember);

router.post("/add", addProject);
router.put("/delete/:id", deleteProject);
router.put("/undelete/:id", unDeleteProject);

router.put("/assignteamleader/:id",assignTeamLeader);
router.put("/dischargeteamleader/:idproject/:idmember/:idpm",dischargeTeamLeader);

router.put("/update/:idproject/:idpm",updateProject);
router.put("/invite-members/:idproject/:idpm",inviteMembers);
router.put("/delete-members/:idproject/:idpm",deleteMembers);

module.exports = router;
