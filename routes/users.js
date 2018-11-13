var express = require('express');
var router = express.Router();
var chalk = require("chalk");

const UserModel = require("../models/users");

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render("login", {});
});

router.post('/login', function (req, res, next) {

  UserModel.find({
    email: req.body.email,
    password: req.body.password
  }, function (err, rows) {
    if (err) {
      res.render("/login", {})
    }
    if (rows.length > 0) {
      console.log(rows)
      req.session.username = req.body.email;
      res.redirect("/")
    }
    else {
      res.render("login", {});
    }
  })
});

router.get('/logout', function (req, res, next) {
  res.render("logout", {});
});

router.get('/signup', function (req, res, next) {
  res.render("signup",{error : ""});
});

router.post('/signup', function (req, res, next) {
  UserModel.find({email : req.body.email}, function(err, rows){

    console.log(rows);

    if(rows.length > 0){
      res.render("signup",{error:"Users already created"});
    }

    else{
      var User= new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
    
      User.save(function(err){
        res.redirect("/user/login");
      });
    }
  })
});
module.exports = router;
