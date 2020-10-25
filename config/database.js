if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('mongoose connect');
});


module.exports = mongoose