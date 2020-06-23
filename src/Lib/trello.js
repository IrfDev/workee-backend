require('dotenv').config();
const trello = require('trello');

const { TRELLO_KEY, TRELLO_TOKEN } = process.env;

const trelloConnection = new trello(TRELLO_KEY, TRELLO_TOKEN);

module.exports = trelloConnection;