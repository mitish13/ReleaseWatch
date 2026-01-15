// objective: calling the ECS Provider module and get the data of ECS service to feed it into healthStatus file.
// And create the output JSON object to send to the frontend dashboard. 
const { listServices, describeService } = require("../providers/ecs.provider");
const { computeHealthStatus } = require("../utils/healthStatus.util");
const { computeDeploymentStatus} = require('../utils/deploymentStatus.util')

const CLUSTER_NAME = process.env.AWS_ECS_CLUSTER_NAME;

async function getEcsServicesHealth() {
  const serviceList = await listServices(CLUSTER_NAME);
  const {serviceArns} = serviceList;
  if (serviceArns.length==0) {
    throw new Error("ECS listServices did not return an array");
  }

  const results = [];

  for (const serviceArn of serviceArns) {
    const service = await describeService(CLUSTER_NAME, serviceArn);
    console.log("Service Description");
    console.log(service)
    const health = computeHealthStatus(service);
    const deploymentStatus = computeDeploymentStatus(service.deployments)
    results.push({
      serviceName: service.serviceName,
      desiredCount: service.desiredCount,
      runningCount: service.runningCount,
      pendingCount: service.pendingCount,
      healthStatus: health, deploymentStatus,
      deployments: service.deployments.map(d => ({
        status: d.status,
        rolloutState: d.rolloutState,
        runningCount: d.runningCount,
        desiredCount: d.desiredCount,
        createdAt: d.createdAt,
        })),
        createdBy:service.createdBy
    });
  }

  return results;
}

module.exports = {
  getEcsServicesHealth
};
