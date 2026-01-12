const express = require("express");
const router = express.Router();
const { listECSServicesHealth } = require("../controllers/ecsService.controller");

router.get("/", listECSServicesHealth);

module.exports = router;
