const express = require('express');
const router = express.Router();
router.post('/',registerDeployment);

module.exports = router;