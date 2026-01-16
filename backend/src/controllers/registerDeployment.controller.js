// TODO: Register deployment through CICD and store into DB
// Why: To link the cicd deployment with ECS Changes

const {ddb} = require('../db');
const {PutCommand} = require('@aws-sdk/lib-dynamodb');

const postDeploymentInfo = async (req,res)=>{
    try {
        console.log(req.body);
        const {deploymentId, createdAt, ...rest} =req.body ?? {};

        if (!deploymentId || typeof deploymentId !== "string") {
        return res.status(400).json({ error: "deploymentId (string) is required" });
        }
        const createdAtIso = (typeof createdAt === "string" && createdAt.trim().length > 0)  ? createdAt : new Date().toISOString();

        //item to store
        const item = {
            deploymentId,
            createdAt: createdAtIso,
            ...rest
        }

        await ddb.send(
            new PutCommand({
                TableName:process.env.DDB_TABLE,
                Item:item,

                //Preventing accidental overwrite of same deployement id
                ConditionExpression: "attribute_not_exists(deploymentId)",

            })
        )

        return res.status(201).json({
            message: "Deployment data has been stored",
            item,
        });
    
    } catch (err) {if (err?.name === "ConditionalCheckFailedException") 
    {  
    return res.status(409).json({
        error: "Deployment with same deploymentId already exists",
      });
    }

    console.error("POST /deploymentRegister failed:", err);
    return res.status(500).json({ error: "Internal server error; Failed to store the deployment data" });
        
    }
 }

 module.exports = { postDeploymentInfo };
