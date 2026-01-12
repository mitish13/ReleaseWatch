//Obejctive: primary bussiness logic for v1 of the application. It computes the data coming from describeService of ECS Cluster
function computeHealthStatus(service) {
  const { desiredCount, runningCount } = service;

  if (runningCount === desiredCount) {
    return "HEALTHY";
  }

  if (runningCount === 0) {
    return "UNHEALTHY";
  }

  return "DEGRADED";
}

module.exports = {
  computeHealthStatus
};
