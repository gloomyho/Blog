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
  imageType: {
    type: String
  },
  map: {
    type: Buffer
  }
})

blogentrySchema.virtual('imagePath').get(function() {
  if(this.image != null && this.imageType != null){
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
  }  
})

module.exports = mongoose.model('blogentry', blogentrySchema)