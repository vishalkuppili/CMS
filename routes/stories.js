var express = require('express');
var router = express.Router();

const StoriesModel = require("../models/stories");

/* /stories/add */
router.get('/add', function(req, res, next) {
    if(typeof req.session.username === "undefined"){
        res.redirect("/user/login");     
    }
    else{
        res.render('stories-add');
    }
});

router.post('/add', function(req, res, next) {
    var validSlug = req.body.title
                    .replace(/[^a-zA-Z0-9 ]/gi, "")
                    .replace(/ /gi, "-")
                    .toLowerCase()
    
    const storiesModelInstance = new StoriesModel({
        title : req.body.title,
        content : req.body.content,
        summary : req.body.summary,
        slug : validSlug,
        author : req.session.username
    });

    storiesModelInstance.save(function(err){
        console.log("story saved");
        if(err){
            res.redirect(`/500`);
        }
        res.redirect(`/stories/${validSlug}`);
    });
});

router.get('/:slug', function(req, res, next) {
    StoriesModel.find({ slug : req.params.slug }, function(err,rows){
        res.render("story", { ...rows[0]._doc })
    })
});

router.post('/:slug', function(req, res, next) {
    var comment = {
        heading : req.body.heading,
        follow_up : req.body.follow_up,
        commentedBy : req.session.username};
    StoriesModel.findOneAndUpdate({ slug : req.params.slug}, {$push:{comments : comment}}, function(err, row){
        console.log('Successful');
    });
    
    StoriesModel.find({ slug : req.params.slug }, function(err, rows){
        if(err){
            res.redirect(`/500`);
        }
        res.render("story", {...rows[0]._doc})
    });
});

module.exports = router;