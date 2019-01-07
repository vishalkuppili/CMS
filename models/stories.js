const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema({
    author : String,
    customer : {type : String},
    created_at : { type : Date, default : Date.now.toLocaleString('en-US', { timeZone: 'America/Menominee' })},
    plantName : String,
    plantLocation : String,
    plantSize : String,
    plantType : String,
    dryletAttendees : String,
    clientAttendees : String,
    phone : String,
    fax : String,
    email : String,
    minutes : String,
    actionItems : String,
    comments : String,
    slug : String,
    followup : [{
        fdryletAttendees : String,
        fclientAttendees : String,
        fminutes : String,
        factionItems : String,
        fcomments : String,
        fcommentedBy : String,
        fdate : { type : Date, default : Date.now.toLocaleString('en-US', { timeZone: 'America/Menominee' })} 
    }]
});

const StoriesModel = mongoose.model("Stories", StoriesSchema);
module.exports = StoriesModel;
