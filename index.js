require('dotenv').config();

const dynamodb = require('./src/Lib/aws');
const server = require('./src/server');

const listenServer = function() {
    return new Promise((res, rej) => {
        server.listen(process.env.PORT, () => {
            res();
        });
    });
};

async function main() {
    await dynamodb;
    console.log('DynamoDB on', dynamodb.endpoint.host);
    await listenServer();
    console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`);
}

main()
    .then(() => {
        console.log('API READY');
    })
    .catch((error) => {
        console.log('Error 😱', error);
    });