const express = require("express");
const {
  getPerformanceByMember,
} = require("../controllers/performanceController");
const router = express.Router();

router.get("/perf/:memberId", getPerformanceByMember);

module.exports = router;
