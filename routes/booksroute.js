const router = require('express').Router();
var multer  = require('multer');
var bookscontroller = require('../models/bookscontroller');
var booksModel = require('../models/booksmodel');

 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+file.originalname);
    }
  })
   
  var upload = multer({ storage: storage }).single('bookcover');
 
  router.get('/',(req,res)=>{
    
    bookscontroller.allbooks().then(function(books){
     var booksreverse = books.reverse();
      if(books){
            res.render("index",{books,booksreverse});
      }else{
        res.send("freak");
      }
    }).catch(function(err){
      console.log("My error"+ err);
  });

  // booksModel.find({}).then(function(books){
  //   res.render("index",{books,books});
  // }).catch(function(err){
  //   console.log("kush ka error" + error);
  // });

  });
  router.get('/books',(req,res)=>{
    res.render("addbook");
  });

router.post('/books', function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return
      }
      var book = req.body;
      book.coverpath =req.file.path;
      bookscontroller.saveBook(book).then(function(book){

                 if(book){
                   console.log(book.title + " is saved");
                   bookscontroller.allbooks().then(function(books){
                    var booksreverse = books.reverse();
                    res.render("index",{books,books})
                      }).catch(function(err){
                     console.log("My error"+ err);
            });
                 }
      });
         
         
      })
  })

 
module.exports = router;                 