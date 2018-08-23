const express = require('express');
const bodyParser = require('body-parser');
const boosroutes = require('./routes/booksroute');
var path = require('path');

var port = process.env.PORT || 4200;

//setup App
var app = express();

//using body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

//setting view
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.render("index");
});

app.use(boosroutes);

app.use('',(req,res)=>{
   res.status(404);
   res.send("page not found");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});