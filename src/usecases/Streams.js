require('dotenv').config();
const streamModel = require('../Models/Stream');
const axios = require('axios');
const feedlyUrl = 'https://cloud.feedly.com/v3';
// const headers = {
//     Authorization: process.env.FEEDLY_TOKEN,
// };

function getAll() {
    return streamModel.find();
}

function getById(id) {
    return streamModel.findById(id);
}

function getByTag(tags) {
    return streamModel.find({ tags });
}

async function getFeedsFromFeedly() {
    try {
        const requestUrl = `${feedlyUrl}/collections`;
        const allStreamsResponse = await axios.get(requestUrl, {
            headers: {
                Authorization: process.env.FEEDLY_TOKEN,
            },
        });
        return allStreamsResponse.data;
    } catch (error) {
        return error.message;
    }
}

async function getStreamsFromFeedly(id) {
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

function updateStream(id, object) {
    return streamModel.findByIdAndUpdate(id, object);
}

function pullFromStream(id, object) {
    return streamModel.findByIdAndUpdate(id, { $pull: object });
}

function pushFromStream(id, obje) {
    return streamModel.findByIdAndUpdate(id, { $push: object });
}

module.exports = {
    getAll,
    create,
    getById,
    updateStream,
    pullFromStream,
    pushFromStream,
    getFeedsFromFeedly,
    getStreamsFromFeedly,
    getByTag,
};