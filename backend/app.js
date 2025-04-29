const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.js');
const Event = require('./models/Event.js');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function main() {
  await mongoose.connect('mongodb+srv://joyaljacob1328:TelKI1ZnLLp9qnRz@cluster0.h9o6ju1.mongodb.net/clubportal');
}
main()
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Root Route
app.get('/', (req, res) => {
  res.send("Hello world");
});

// Register User Route
app.post('/users', async (req, res) => {
  try {
    const userItem = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      club: req.body.club
    };
    const user = new User(userItem);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("User registration error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get Events Route
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
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
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Start Server
app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
