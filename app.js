const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const boosroutes = require('./routes/booksroute');
var path = require('path');

var port = process.env.PORT || 4200;
mongoose.connect("mongodb://localhost:27017/bookslover", {
    useNewUrlParser: true
}, function () {
    console.log("db connetion successfull");
});
mongoose.Promise = global.Promise;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(boosroutes);

app.use('', (req, res) => {
    res.status(404);
    res.send("page not found");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});