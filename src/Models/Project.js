const dynamoose = require('dynamoose');

const ProjectSchema = new dynamoose.Schema({
    title: {
        type: String,
        required: true,
        hashKey: true,
        index: true,
        validate: (val) => val > 0 < 15,
    },
    description: {
        type: String,
        required: true,
        validate: (val) => val > 0 < 25,
    },
    thumb: {
        type: String,
        required: true,
    },
    weekly: {
        type: Object,
        schema: {
            boards: {
                type: Array,
                required: true,
            },
        },
    },
    daily: {
        type: Object,
        schema: {
            tasks: {
                type: Array,
                required: true,
            },
        },
    },
    sources: {
        type: Object,
        schema: {
            streams: Array,
            heroes: {
                type: Array,
                required: true,
            },
        },
    },
    resources: {
        type: Object,
        schema: {
            repos: {
                type: Array,
                required: true,
            },
            notebooks: {
                type: Array,
                required: true,
            },
            resources: {
                type: Array,
                required: true,
            },
        },
    },
});
module.exports = dynamoose.model('Project', ProjectSchema, { update: true });