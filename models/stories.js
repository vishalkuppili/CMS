const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema({
    author : String,
    title : {type : String, unique : true},
    created_at : { type : Date, default : Date.now },
    summary : String,
    content : String,
    imageLink : String,
    slug : String,
    comments : [{
        heading : String,
        follow_up : String,
        commentedBy : String,
        date : { type : Date, default : Date.now } 
    }]
});

const StoriesModel = mongoose.model("Stories", StoriesSchema);
module.exports = StoriesModel;