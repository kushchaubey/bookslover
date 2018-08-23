const router = require('express').Router();
var multer  = require('multer')
//var upload = multer({ dest: 'static/images/upload' });


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/images/upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+file.originalname);
    }
  })
   
  var upload = multer({ storage: storage }).single('bookcover');

router.get('/books',(req,res)=>{
   res.render("addbook");
});

router.post('/books', function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return
      }
         console.log(req.file);
         console.log(req.body);
      // Everything went fine
      res.render('addbook');
    })
  })

module.exports = router;                 