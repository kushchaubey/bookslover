const mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
    title:String,
    author:String,
    rating:Number,
    desc:String,
    coverpath:String
   });

var BookModel = mongoose.model('book',BookSchema);

module.exports = BookModel;