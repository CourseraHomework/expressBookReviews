const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  //return res.send(JSON.stringify(({message:{"username":username, "password": password}})));

  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});

});

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  return new Promise((resolve,reject) => {
    
        resolve(res.send(JSON.stringify(books,null, 10)));

    });

    

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;

  return new Promise((resolve,reject) => {
    
    resolve(res.send(books[isbn]));

});

  return res.send(books[isbn]);

  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  return new Promise((resolve,reject) => {
    

    const author = req.params.author;

    let arrayAuths = [];

    for(let i = 1; i < Object.keys(books).length; i++)
    {
        if(books[i]["author"] === author)
        {
            arrayAuths.push(books[i]);

        }
    }    

    resolve(res.send(arrayAuths));

});

  const author = req.params.author;

    let arrayAuths = [];

    for(let i = 1; i < Object.keys(books).length; i++)
    {
        if(books[i]["author"] === author)
        {
            arrayAuths.push(books[i]);

        }
    }    

   return res.send(arrayAuths);

    

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  
  return new Promise((resolve,reject) => {
    
    const title = req.params.title;

    let arrayAuths = [];

    for(let i = 1; i < Object.keys(books).length; i++)
    {
        if(books[i]["title"] === title)
        {
            arrayAuths.push(books[i]);

        }
    }    

    resolve(res.send(arrayAuths));

});




  const title = req.params.title;

    let arrayAuths = [];

    for(let i = 1; i < Object.keys(books).length; i++)
    {
        if(books[i]["title"] === title)
        {
            arrayAuths.push(books[i]);

        }
    }    

   return res.send(arrayAuths);


});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;

  var objISBNRev = books[isbn];
  return res.send(objISBNRev["reviews"]);

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
