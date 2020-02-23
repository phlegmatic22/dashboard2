let mongoose = require('mongoose');

// Article Schema
let dataSchema = mongoose.Schema({
  humidity:{
    type: String,
    required: true
  },
  temperature:{
    type: String,
    required: true
  },
  irrigationlevel:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  time:{
    type: String,
    required: true
  }
});

let Data = module.exports = mongoose.model('Data', dataSchema);
