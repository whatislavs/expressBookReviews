const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');

const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    // res.send(JSON.stringify(books,null,4));
    try {
        const allBooks = await Promise.resolve(books);
        res.send(JSON.stringify(allBooks, null, 4));
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send('Failed to load books data');
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    const isbn= req.params.isbn;
    // res.send(books[isbn]);
    try {
        const allBooks = await Promise.resolve(books[isbn]);
        res.send(allBooks);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send('Failed to load books data');
    }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    // let booksArray = Object.values(books);
    // let filtered_author = booksArray.filter((book) => book.author === author);
    // res.send(filtered_author);
    try {
        const allBooks = await Promise.resolve(books);
        let booksArray = Object.values(allBooks);
        let filtered_author = booksArray.filter((book) => book.author === author);
        res.send(filtered_author);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send('Failed to load books data');
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    // let booksArray = Object.values(books);
    // let filtered_title = booksArray.filter((book) => book.title === title);
    // res.send(filtered_title);
    try {
        const allBooks = await Promise.resolve(books);
        let booksArray = Object.values(allBooks);
        let filtered_title = booksArray.filter((book) => book.title === title);
        res.send(filtered_title);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send('Failed to load books data');
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn= req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
