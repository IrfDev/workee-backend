const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 230,
    },
    thumb: {
        type: String,
    },
    weekly: {
        type: Object,
        boards: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Board',
        }, ],
    },
    daily: {
        type: Object,
        tasks: [{
            type: [mongoose.SchemaTypes.ObjectId, Object],
            ref: 'Task',
        }, ],
    },
    sources: {
        type: Object,
        streams: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Stream',
        }, ],
        heroes: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Heroe',
        }, ],
    },
    resources: {
        type: Object,
        repos: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Repo',
        }, ],
        notebooks: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Notebook',
        }, ],
        resources: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Resource',
        }, ],
    },
});
module.exports = mongoose.model('Project', ProjectSchema);