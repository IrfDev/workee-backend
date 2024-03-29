const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  website: {
    type: String,
  },
});

module.exports = mongoose.model('Resource', ResourceSchema);
