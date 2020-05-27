require('dotenv').config();
const dynamoDb = require('aws-sdk/clients/dynamodb');

const dynamodb = new dynamoDb();

module.exports = dynamodb;