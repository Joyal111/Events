// backend/server.js or backend/routes/events.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb+srv://joyaljacob1328:TelKI1ZnLLp9qnRz@cluster0.h9o6ju1.mongodb.net/clubportal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Event Schema
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

// Routes

// Get all events
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Admin: Create event
app.post('/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: Update event
app.put('/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: Delete event
app.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
