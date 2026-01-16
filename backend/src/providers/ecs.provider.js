// Objective: That's the only file connect this app with AWS Service SDK. Get info about the ECS Service running in defined cluster. 
const {ListServicesCommand, DescribeServicesCommand, ListTasksCommand} = require("@aws-sdk/client-ecs");
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

// TODO: Container health check 


module.exports = {
  listServices,
  describeService
};