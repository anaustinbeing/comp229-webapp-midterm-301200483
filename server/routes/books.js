// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Displaying the add book page by passing an empty book.
     res.render('books/details', {
      title: 'Add Book',
      books: book
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Create a new book model with values from the form fields.
    let newBook = book({
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    });
    // Creating new book by passing in the new book.
    book.create(newBook, (err) => {
      if (err) {
        console.log("Error while creating book : " + err);
      } else {
        res.redirect('/books');
      }
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    id = req.params.id;
    // Finding the book using the id.
    book.findById({'_id': id}, (err, book) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/details', {
          title: 'Edit Book',
          books: book
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     id = req.params.id;
     // Create a new book model with same id as the previous one for update.
     let editedBook = book({
       '_id': id,
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    });
    // Updating the book using the id and passing the book instance.
    book.updateOne({'_id': id}, editedBook, (err) => {
      if (err) {
        console.log("Error while editing book : " + err);
      } else {
        res.redirect('/books');
      }
    })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    id = req.params.id;
    // Removing the book using the id.
    book.remove({'_id': id}, (err) => {
      if (err) {
        console.log("Erro while deleting book : " + err);
      } else{
        res.redirect('/books');
      }
    })
});


module.exports = router;
