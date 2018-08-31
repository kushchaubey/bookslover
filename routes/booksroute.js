const router = require('express').Router();
var multer = require('multer');
var bookscontroller = require('../models/bookscontroller');
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
})

var upload = multer({
  storage: storage
}).single('bookcover');

router.get('/', (req, res) => {

  bookscontroller.allbooks().then(function (books) {
    var booksreverse = books.reverse();
    if (books) {
      res.render("index", {
        books:booksreverse,
        flag:0
      });
    } else {
      res.send("freak");
    }
  }).catch(function (err) {
    console.log("My error" + err);
  });

});
router.get('/books', (req, res) => {
  res.render("addbook");
});
router.post('/allbooks', (req, res) => {
  console.log(req.body.keyword);
  bookscontroller.searchbooks(req.body.keyword).then(function (books) {
    var booksreverse = books.reverse();
    if (books) {
      res.render("index", {
        books:booksreverse,
        flag:1
      });
    } else {
      res.send("freak");
    }
  }).catch(function (err) {
    console.log("My error" + err);
  });
 });
  
router.post('/addbooks', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return
    }
    var book = req.body;
    book.coverpath = req.file.path;
    bookscontroller.saveBook(book).then(function (book) {

      if (book) {
        console.log(book.title + " is saved");
        res.redirect('/')
      }
    });


  })
});

router.post('/delate',function(req,res){

    bookscontroller.deleteBook(req.body.bookid).then((books)=>{
      console.log(books.title +" deleted successfully");
         fs.unlink(books.coverpath,(err)=>{
           if(err){
             console.log("something went wrong while deleting the file");
           }
           else{
            res.redirect('/')
           }
         })
    }).catch(function (err) {
      console.log("My error" + err);
    });
});

router.post('/edit',(req,res)=>{
  let book_id = req.body.bookid;
  delete req.body['bookid'];
   bookscontroller.updateBook(book_id,req.body).then((book)=>{
    res.redirect('/')
   }).catch((err)=>{
    console.log("My error" + err);
   });
});
module.exports = router;