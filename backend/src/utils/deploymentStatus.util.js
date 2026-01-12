function computeDeploymentStatus(deployments) {
  if (!deployments || deployments.length === 0) {
    return "UNKNOWN";
  }

  const primary = deployments.find(d => d.status === "PRIMARY");

  if (!primary) {
    return "UNKNOWN";
  }

  if (primary.rolloutState === "IN_PROGRESS") {
    return "DEPLOYING";
  }

  if (primary.rolloutState === "COMPLETED") {
    return "STABLE";
  }

  if (primary.rolloutState === "FAILED") {
    return "FAILED";
  }

  return "UNKNOWN";
}

module.exports = {
  computeDeploymentStatus
};
