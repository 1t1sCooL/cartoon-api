const mongoose = require('mongoose');

const cartoonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origName: { type: String },
  img: { type: String },
  ratingKP: { type: String },
  ratingIMDB: { type: String },
  country: { type: String },
  year: { type: Number },
  age: { type: String },
  genre: { type: [String] },
  director: { type: [String] },
  actors: { type: [String] },
  descList: { type: [String] },
  kadikamaLink: { type: String },
});

module.exports = mongoose.model('Cartoon', cartoonSchema, 'Cartoons');