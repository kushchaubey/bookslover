const router = require('express').Router();

router.get('/books',(req,res)=>{
   res.render("addbook");
});

router.post('/bookspost',(req,res)=>{
    res.send("form for posting the books");
});

module.exports = router;                 