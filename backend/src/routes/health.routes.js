const express = require('express');;
const router = express.Router();

// Health check route
router.get('/', (req, res) => {
    res.json({
        status:'OK',
        service:'ReleaseWatch-backend',
        timestamp:new Date().toISOString() // Return the current timestamp in ISO format;
    })
});

module.exports = router;