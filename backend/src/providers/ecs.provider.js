// This file will call ECS SDK APIs 
const {ListServicesCommand, DescribeServicesCommand} = require("@aws-sdk/client-ecs");
const {ecsClient} = require('../config/aws');

async function listServices(cluster) {
  const command = new ListServicesCommand({ cluster });
  const response = await ecsClient.send(command);

  return response;
}

async function describeService(cluster, serviceArn) {
  const command = new DescribeServicesCommand({
    cluster,
    services: [serviceArn]
  });

  const response = await ecsClient.send(command);
  return response.services[0];
}

module.exports = {
  listServices,
  describeService
};