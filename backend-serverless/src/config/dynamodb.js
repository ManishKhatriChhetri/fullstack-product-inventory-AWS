const { DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
    ScanCommand
} = require('@aws-sdk/lib-dynamodb');

//Create DynamoDB Client to communicate to DynamoDB
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
});

//Create DynamoDB Document Client for easier data manipulation
const documentClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
});

//Helper functions
const dynamoDB = {
    async get(params){
        const command = new GetCommand(params);
        return await documentClient.send(command);
    },

    async put(params){
        const command = new PutCommand(params);
        return await documentClient.send(command);
    },

    async update(params){
        const command = new UpdateCommand(params);
        return await documentClient.send(command);
    },

    async delete(params){
        const command = new DeleteCommand(params);
        return await documentClient.send(command);
    },

    async scan(params){
        const command = new ScanCommand(params);
        return await documentClient.send(command);
    }
};

module.exports = dynamoDB;