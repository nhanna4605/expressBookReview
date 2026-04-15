const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // BẮT BUỘC PHẢI CÓ

// Task 10: Get all books using Async/Await
public_users.get('/', async function (req, res) {
    try {
        res.status(200).send(JSON.stringify(books, null, 4));
    } catch (error) {
        res.status(500).json({message: "Error fetching books"});
    }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    new Promise((resolve, reject) => {
        if (books[isbn]) resolve(books[isbn]);
        else reject("Book not found");
    })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).json({message: err}));
});

// Task 12: Get book details based on author using Promises
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(b => b.author === author);
        if (filteredBooks.length > 0) resolve(filteredBooks);
        else reject("Author not found");
    })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({message: err}));
});

// Task 13: Get book details based on title using Promises
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(b => b.title === title);
        if (filteredBooks.length > 0) resolve(filteredBooks);
        else reject("Title not found");
    })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({message: err}));
});

module.exports.general = public_users;
