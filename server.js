/********************************************************************************** 
WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
** Name: Shaswot Dhakal
**Student ID: 114460223
**Date: 2024 Jan 19
**Cyclic Link: _______________________________________________________________
*********************************************************************************/

/*
id- sdhakal11
pass- VXGkSImq5T4H8NQA
*/



const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const MoviesDB = require("./modules/moviesDB.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'API Listening'});
});

const db = new MoviesDB();

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


//mongodb+srv://sdhakal11:VXGkSImq5T4H8NQA@bti425.a6mvs9a.mongodb.net/bti425?retryWrites=true&w=majority