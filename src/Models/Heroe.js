const mongoose = require('mongoose');

const HeroeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  links: [
    {
      website: { type: String },
      urlLink: { type: String },
    },
  ],
});
module.exports = mongoose.model('Heroe', HeroeSchema);
