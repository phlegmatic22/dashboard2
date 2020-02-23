let mongoose = require('mongoose');

// Article Schema
let controlSchema = mongoose.Schema({
  id:{
    type: String,
    required: true
  },
  gpio:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  }
});

let Control = module.exports = mongoose.model('Control', controlSchema);
