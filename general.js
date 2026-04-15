const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve) => {
    resolve(books);
  });
  getBooks.then((bookList) => res.send(JSON.stringify(bookList, null, 4)));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBook = new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject("Không tìm thấy sách");
  });
  getBook.then((book) => res.send(book)).catch((err) => res.status(404).send(err));
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const getByAuthor = new Promise((resolve) => {
    let filtered = Object.values(books).filter(b => b.author === author);
    resolve(filtered);
  });
  getByAuthor.then((result) => res.send(result));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const getByTitle = new Promise((resolve) => {
    let filtered = Object.values(books).filter(b => b.title === title);
    resolve(filtered);
  });
  getByTitle.then((result) => res.send(result));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;