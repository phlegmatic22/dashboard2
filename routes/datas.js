const express = require('express');
const router = express.Router();


// Bring in User Model
let Data = require('../models/data');


router.get('/', function (req, res) {
  res.render('data', {
    title: 'Data'
  });
});

router.get('/number/:number', function (req, res) {
  var number = Number(req.params.number);
  res.render('data', {
    title: 'Data',
    number: number
  });
});


router.get('/fetch', function (req, res) {
  Data.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {

      console.log(data.length);
      res.status(200).send(data);
    }
  });
});

router.get('/fetch/number/:number', function (req, res) {
  console.log("jihuu");
  Data.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var limit = Number(req.params.number);
      console.log(data.length);
      data = data.slice(data.length - limit, data.length);
      res.status(200).send(data);
    }
  });
});

//delete all datapoints
router.post('/deleteall', function (req, res) {
  Data.deleteMany({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', 'Data deleted');
      res.redirect('/datas');
    }
  });
});

// Add Submit POST Route
router.get('/add', function (req, res) {
  console.log(req.body)
  req.checkBody('humidity', 'humidity is required').notEmpty();
  req.checkBody('temperature', 'temperature is required').notEmpty();
  req.checkBody('irrigationlevel', 'irrigationlevel is required').notEmpty();


  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.status(500).send('error');
    res.render('data', {
      title: 'ERROR',
      errors: errors
    });
  } else {
    res.status(200).send('ok');
    let data = new Data();
    data.humidity = req.params.humidity;
    data.temperature = req.params.temperature;
    data.irrigationlevel = req.params.irrigationlevel;
    data.time = new Date().toLocaleTimeString();
    data.date = new Date().toLocaleDateString();

    data.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Data Added');
        res.redirect('/datas');
      }
    });
  }
});

router.get('/add/humidity/:humidity/temperature/:temperature/irrigationlevel/:irrigationlevel', function (req, res) {
  console.log("working dawg", req.params);


  let data = new Data();
  data.humidity = req.params.humidity;
  data.temperature = req.params.temperature;
  data.irrigationlevel = req.params.irrigationlevel;
  data.time = new Date().toLocaleTimeString();
  data.date = new Date().toLocaleDateString();

  data.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send('Failed to save the data.');
    } else {
      console.log('Data was saved.');
      res.status(200).send(req.params);
    }
  });
});




module.exports = router;