var express = require('express');
var router = express.Router();
var chalk = require("chalk");

const StoriesModel = require("../models/stories");

/* GET home page. */
router.get('/', function(req, res, next) {
  if(typeof req.session.username === "undefined"){
    res.redirect("/user/login");     
  }
  else{
    StoriesModel.find({}, function(err,rows){
      res.render('index', { rows:rows, session : req.session });
    })
    console.log(chalk.white(req.session));
  }
});

module.exports = router;