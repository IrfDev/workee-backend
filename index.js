require('dotenv').config();

const dbConnect = require('./src/Lib/db');
const server = require('./src/server');

const listenServer = function() {
    return new Promise((res, rej) => {
        server.listen(process.env.PORT, () => {
            res();
        });
    });
};

async function main() {
    await dbConnect();
    console.log('MongoDB connected');
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