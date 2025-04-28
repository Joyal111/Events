const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.js');
const Event = require('./models/Event.js');  // Create this file
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
async function main() {
    await mongoose.connect('mongodb+srv://joyaljacob1328:TelKI1ZnLLp9qnRz@cluster0.h9o6ju1.mongodb.net/clubportal');
  }
  main()
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));
    app.get('/', (req, res) => {
        res.send("Hello world");
      });
      
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
          console.error(error);
          res.status(500).json({ error: error.message });
        }
      });
      
      // 🆕 This is your Events fetch API
      app.get("/events", async (req, res) => {
        try {
          const events = await Event.find();
          res.json(events);
        } catch (error) {
          console.error("Error fetching events:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
        
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
      