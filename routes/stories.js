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
    var first = req.body.customer
                    .replace(/[^a-zA-Z0-9 ]/gi, "")
                    .replace(/ /gi, "-")
                    .toLowerCase()

    var validSlug = first+"-"+(Math.floor(Date.now() / 1000).toString());

    const storiesModelInstance = new StoriesModel({
        customer : req.body.customer,
        plantName : req.body.plantName,
        plantLocation : req.body.plantLocation,
        plantSize : req.body.plantSize,
        plantType : req.body.plantType,
        dryletAttendees : req.body.dryletAttendees,
        clientAttendees : req.body.clientAttendees,
        phone : req.body.phone,
        fax : req.body.fax,
        email : req.body.email,
        minutes : req.body.minutes,
        actionItems: req.body. actionItems,
        comments : req.body.comments,
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

router.get('/myMeetings', function(req,res,next){
    if(typeof req.session.username === "undefined"){
        res.redirect("/user/login");     
    }
    else{
        StoriesModel.find({ author : req.session.username }, function(err,rows){
            res.render("my-meetings", {rows:rows})
        })
    }
});

router.get('/:slug', function(req, res, next) {
    StoriesModel.find({ slug : req.params.slug }, function(err,rows){
        res.render("story", {...rows[0]._doc})
    })
});

router.post('/:slug', function(req, res, next) {
    var followup = {
        fdryletAttendees : req.body.fdryletAttendees,
        fclientAttendees : req.body.fclientAttendees,
        fminutes : req.body.fminutes,
        factionItems: req.body.factionItems,
        fcomments : req.body.fcomments,
        fcommentedBy : req.session.username
    };
    
    StoriesModel.findOneAndUpdate({ slug : req.params.slug}, {$push:{followup : followup}}, function(err, row){
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