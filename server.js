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
const MoviesDB = require('./modules/moviesDB.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new MoviesDB();

app.post('/api/movies', async (req, res) => {
  try {
    const movie = await db.addNewMovie(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get('/api/movies', async (req, res) => {
  try {
    const { page, perPage, title } = req.query;
    const movies = await db.getAllMovies(page, perPage, title);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await db.getMovieById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.put('/api/movies/:id', async (req, res) => {
  try {
    const result = await db.updateMovieById(req.body, req.params.id);
    if (result.nModified > 0) {
      res.json({ message: 'Movie updated successfully' });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    const result = await db.deleteMovieById(req.params.id);
    if (result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
  .catch(err => console.error(err));
