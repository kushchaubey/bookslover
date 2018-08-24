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
    
    booksModel.find({},function(err,books){
      if(err){
          console.log("err fetching data");
      }  

       res.render("index",{books:books});
    });
    
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
         bookscontroller.saveBook(book);
         booksModel.find({},function(err,books){
          if(err){
              console.log("err fetching data");
          }  
    
           res.render("index",{books:books});
        });
         
      })
  })

 
module.exports = router;                 