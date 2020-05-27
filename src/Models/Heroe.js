const dynamoose = require('dynamoose');

const HeroeSchema = new dynamoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    links: {
        type: Array,
        schema: {
            site: String,
            url: String,
        },
    },
});
module.exports = dynamoose.model('Heroe', HeroeSchema);