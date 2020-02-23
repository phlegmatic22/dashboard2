const express = require('express');
const router = express.Router();


// Bring in User Model
let Control = require('../models/control');


router.get('/', function(req, res){
  Control.find({}, function(err, controls){
    if(err){
      console.log(err);
    } else {
      console.log(controls.length);
      res.render('control', {
        title:'Controls',
        controls: controls
      });
    }
  });
});

router.get('/add_control', function(req, res){
  res.render('add_control', {
    title:'asdasd'
  });

});


router.post('/add', function(req, res){
  req.checkBody('id','id is required').notEmpty();
  req.checkBody('name','name is required').notEmpty();
  req.checkBody('gpio','gpio is required').notEmpty();
  req.checkBody('state','state is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();
  
  if(errors){
    res.render('control', {
      title:'ERROR',
      errors:errors
    });
  } else {
    let control = new Control();
    control.id = req.body.id;
    control.name = req.body.name;
    control.gpio = req.body.gpio;
    control.state = req.body.state;

    control.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Control Added');
        res.redirect('/controls');
      }
    });
  }
});


module.exports = router;
