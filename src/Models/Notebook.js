const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
  onenoteId: {
    type: String,
    required: true,
  },
  sections: [
    {
      type: String,
    },
  ],
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  topics: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('Notebook', notebookSchema);
