const express = require('express');
const router = express.Router();
const {postDeploymentInfo} = require('../controllers/registerDeployment.controller')

router.post('/',postDeploymentInfo);

module.exports = router;