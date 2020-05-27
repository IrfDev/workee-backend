require('dotenv').config();
const trello = require('trello');

const { TRELLO_KEY, TRELLO_TOKEN } = process.env;

module.exports = new trello(TRELLO_KEY, TRELLO_TOKEN);