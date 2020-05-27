require('dotenv').config();
const streamModel = require('../Models/Stream');
const axios = require('axios');
const feedlyUrl = 'https://cloud.feedly.com/v3';
// const headers = {
//     Authorization: process.env.FEEDLY_TOKEN,
// };

async function getAll() {
    try {
        const requestUrl = `${feedlyUrl}/collections`;
        const allStreamsResponse = await axios.get(requestUrl, {
            headers: {
                Authorization: process.env.FEEDLY_TOKEN,
            },
        });
        console.log(allStreamsResponse);
        return allStreamsResponse.data;
    } catch (error) {
        return error.message;
    }
}

async function getById(id) {
    try {
        const allEntities = await axios.get(`${feedlyUrl}/streams/contents`, {
            params: {
                streamId: id,
            },
            headers: {
                Authorization: process.env.FEEDLY_TOKEN,
            },
        });
        return allEntities.data;
    } catch (error) {
        return error.message;
    }
}

function create(newstream) {
    return streamModel.create(newstream);
}

function updateStream(name, object) {
    return streamModel.update({ resourcesid: name }, object);
}

module.exports = {
    getAll,
    create,
    getById,
    updateStream,
};