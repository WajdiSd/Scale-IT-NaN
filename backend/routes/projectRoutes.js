const express = require("express");
const { addProject, deleteProject, unDeleteProject, 
    assignTeamLeader,updateProject,dischargeTeamLeader,
    inviteMembers,deleteMembers } = require("../controllers/projectController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
router.post("/add", addProject);
router.put("/delete/:id", deleteProject);
router.put("/undelete/:id", unDeleteProject);

router.put("/assignteamleader/:id",assignTeamLeader);
router.put("/dischargeteamleader/:idproject/:idmember/:idpm",dischargeTeamLeader);

router.put("/update/:idproject/:idpm",updateProject);
router.put("/invite-members/:idproject/:idtl",inviteMembers);
router.put("/delete-members/:idproject/:idpm",deleteMembers);

module.exports = router;
