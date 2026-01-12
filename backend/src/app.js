const express = require('express');
const cors=require('cors');
const healthRoute = require('./routes/health.routes')
const ecsServiceHealth = require('./routes/ecsServiceHealth.routes')
const app = express();

// Middleware
app.use(cors()); // To allow cross-origin requests; without this, any requests from different domains would be blocked.
app.use(express.json()) // To parse incoming JSON requests; without this, req.body would be undefined for JSON payloads.

// API running marker route
app.use('/health', healthRoute);
app.use('/ecsServices',ecsServiceHealth)

module.exports = app;