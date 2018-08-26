const BooksModel = require('./booksmodel');

var saveBook = function(book){
    var addbook = new BooksModel({
       title:book.title,
       author:book.author,
       rating:book.rating,
       desc:book.desc,
       coverpath:book.coverpath
    });

    return new Promise((resolve, reject) => {
    addbook.save().then(function(book){
         resolve(book);
    }).catch(function(err){
        reject(err);
    });
  }
);


}


var allbooks =function(){
    return new Promise((resolve, reject) => {
        BooksModel.find({}).then(function(books){
          resolve(books);
        }).catch(function(err){
         reject("kush ka error" + error);
        });
}); 
}   
    module.exports = {saveBook,allbooks};