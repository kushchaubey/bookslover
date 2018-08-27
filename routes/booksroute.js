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
        books:booksreverse
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

router.post('/books', function (req, res) {
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
        bookscontroller.allbooks().then(function (books) {
          var booksreverse = books.reverse();
          res.render("index", {
            books:booksreverse
          })
        }).catch(function (err) {
          console.log("My error" + err);
        });
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
            bookscontroller.allbooks().then(function (books) {
              var booksreverse = books.reverse();
              res.render("index", {
                books:booksreverse
              })
            }).catch(function (err) {
              console.log("My error" + err);
            });
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
    bookscontroller.allbooks().then(function (books) {
      var booksreverse = books.reverse();
      res.render("index", {
        books:booksreverse
      })
    }).catch(function (err) {
      console.log("My error" + err);
    });
   }).catch((err)=>{
    console.log("My error" + err);
   });
});
module.exports = router;