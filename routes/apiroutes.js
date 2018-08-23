const routes = require('express').Router();

routes.get('/booksapi',(req,res)=>{
   res.send("All the booksapi are here");
});

routes.get('/bookspostapi',(req,res)=>{
    res.send("form for posting the booksapi");
});

module.exports = routes;                 