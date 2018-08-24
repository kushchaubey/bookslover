const BooksModel = require('./booksmodel');

var saveBook = function(book){
    var addbook = new BooksModel({
       title:book.title,
       author:book.author,
       rating:book.rating,
       desc:book.desc,
       coverpath:book.coverpath
    });
    addbook.save(function(err){
       if(err){
           return err;
       }
       return "book has been saved";
    });
}

function allbooks(){
  
    var callback = function() {
        return  function (error, books) {
            if(error) {
               return "error fetching books";
            }
            
           return  books;
        }
    };
  BooksModel.find({},callback);
    
   
}
    module.exports = {saveBook,allbooks};