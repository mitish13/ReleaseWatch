// This file will just configure all the AWS Service sdk we using 
const {ECSClient}= require('@aws-sdk/client-ecs'); 

const ecsClient= new ECSClient({
    region: process.env.AWS_REGION
})

module.exports={
    ecsClient
}