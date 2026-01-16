const { DynamoDBClient } =  require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");


const client = new DynamoDBClient({ region: process.env.AWS_REGION });

// DocumentClient gives you normal JS objects (no DynamoDB AttributeValue wrappers)
const ddb = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

module.exports = { ddb };
