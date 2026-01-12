// Objective: The controller of ECS Service path, first point of communication when user hits the /ecsService api. 
const { getEcsServicesHealth } = require("../services/ecsHealth.service");

async function listECSServicesHealth(req, res) {
  try {
    const services = await getEcsServicesHealth();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch ECS services health"
    });
  }
}

module.exports = {
  listECSServicesHealth
};
