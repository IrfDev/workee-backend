const mongoose = require('mongoose');

const {
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
    MONGO_DB_HOST,
    MONGO_DB_NAME,
} = process.env;

const uri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

module.exports = () =>
    mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });