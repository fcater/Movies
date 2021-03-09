const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  otherTitle: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  releaseDate: {
    type: Date,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  distributionArea: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 10
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  starring: {
    type: String,
    required: true,
    trim: true,
  },
  doubanLink: {
    type: String,
    required: true,
    trim: true,
  },
  plotSummary: {
    type: String,
    required: true,
    trim: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  publishDate: {
    type: Date,
    default: new Date()
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(1).max(50).required(),
    genreId: Joi.objectId().required(),
    otherTitle: Joi.string(),
    img: Joi.string().min(1).required(),
    releaseDate: Joi.string().min(5).max(50).required(),
    distributionArea: Joi.string().min(1).max(10).required(),
    director: Joi.string().required(),
    starring: Joi.string().required(),
    doubanLink: Joi.string().required(),
    plotSummary: Joi.string().required(),
    rate: Joi.number().min(0).max(10).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;