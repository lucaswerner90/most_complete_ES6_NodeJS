const all_books=require('../data/books_complete.json');

class BookParser {
  constructor() {

  }
  getAllBooks(){
    // We need to convert all the books response in an array object because
    // in a normal situation it returns objects inside another object...
    let parsedBooks=[];
    for (let book in all_books) {
      parsedBooks.push(all_books[book]);
    }
    return parsedBooks;
  }

  filterByOLID(OLID=''){

    if(all_books[OLID]){
      let OLID_Book=[];
      OLID_Book.push(all_books[OLID]);
      return OLID_Book;
    }else{
      return [];
    }

  }

  filterByTitle(title=''){
    let filteredBooks=[];
    for (let book in all_books) {
      if(all_books[book].title.toLowerCase().indexOf(title.toLowerCase())>-1){
        filteredBooks.push(all_books[book]);
      }
    }
    return filteredBooks;
  }
}


module.exports = BookParser;
