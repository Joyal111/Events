const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  club: String,
  date: String,
  time: String,
  venue: String,
  description: String,
  image: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
