/*
id- 
pass- VXGkSImq5T4H8NQA
*/
/*
const MongoClient = require('mongoose').MongoClient;
const uri = "mongodb+srv://shaswotdhakal:4wBJyNmqibVIT4Qk@cluster1.vgxvqbc.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("sample_mflix").collection("movies");
  // perform actions on the collection object
  client.close();
});

module.exports = client;
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  num_mflix_comments: Number,
  poster: String,
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: {
    wins: Number,
    nominations: Number,
    text: String
  },
  lastupdated: Date,
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number
  },
  countries: [String],
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number
    },
    dvd: Date,
    lastUpdated: Date
  }
}
);

module.exports = class MoviesDB {
  constructor() {
    this.Movie = null;
  }

  
  initialize(connectionString) {
    return new Promise((resolve, reject) => {
      const db = mongoose.createConnection(
        connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );

      db.once('error', (err) => {
        reject(err);
      });
      db.once('open', () => {
        this.Movie = db.model("movies", movieSchema);
        resolve();
      });
    });
  }

  async addNewMovie(data) {
    const newMovie = new this.Movie(data);
    await newMovie.save();
    return newMovie;
  }

  getAllMovies(page, perPage, title) {
    let findBy = title ? { title } : {};

    if (+page && +perPage) {
      return this.Movie.find(findBy).sort({ year: +1 }).skip((page - 1) * +perPage).limit(+perPage).exec();
    }

    return Promise.reject(new Error('page and perPage query parameters must be valid numbers'));
  }

  getMovieById(id) {
    return this.Movie.findOne({ _id: id }).exec();
  }

  updateMovieById(data, id) {
    return this.Movie.updateOne({ _id: id }, { $set: data }).exec();
  }

  deleteMovieById(id) {
    return this.Movie.deleteOne({ _id: id }).exec();
  }
}
