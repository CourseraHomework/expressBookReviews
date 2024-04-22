const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }

//const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
//}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  console.log(username + " " + password);
  console.log("users in users are: ");
  console.log(users);

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in. Access Token is Bearer: " + accessToken);
  } 

  else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

  //return res.status(300).json({message: "Yet to be implemented"}););


regd_users.get("/auth/review", (req, res) => {

    return res.send("ok");

});

// Add a book review
regd_users.post("/auth/review", (req, res) => {
  //Write your code here
 
    var isbn = req.body.isbn;
    var review = req.body.review;

    var user = req.session.authorization['username'];

    var objISBNRev = books[isbn];

    var addNewReview = true;
    for(let i = 0; i < objISBNRev["reviews"].length; i++)
    {
        var rev = objISBNRev["reviews"][i];
        if(rev["username"] === user)
        {
            console.log("review found, changing review text");
            addNewReview = false;
        }
    }

    if(addNewReview)
    {
        let booksObj = books[isbn];
        booksObj.reviews = {user, review};
        books[isbn].reviews = ({user, review});
        console.log(booksObj["reviews"]);
        console.log("Added review");
    }

    return res.send(books[isbn]);
});

regd_users.post("/auth/deletereview", (req, res) => {

    //res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    var isbn = req.body.isbn;

    var user = req.session.authorization['username'];

    var oldReview = "";

    let custObject = books[isbn];
    if(custObject.reviews.user === user)
    {
        oldReview = custObject.reviews.review;
        custObject.reviews = {};
    }

    res.send("Deleted review: " + oldReview + " for user " + user);

});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
