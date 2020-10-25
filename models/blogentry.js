const mongoose = require('mongoose')

const blogentrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastEdited: {
    type: Date
  },
  image: {
    type: Buffer
  },
  map: {
    type: Buffer
  }
})

module.exports = mongoose.model('blogentry', blogentrySchema)