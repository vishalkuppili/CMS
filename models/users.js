const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name : String,
    password : String,
    email : String,
    experience : Number,
    stories : Array
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;       