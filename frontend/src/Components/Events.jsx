import React, { useState, useEffect } from "react";
import './Events.css'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useForm } from 'react-hook-form';

// EventCard component
const EventCard = ({ event }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/users", data);
      alert("Registration successful!");
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Enrollment failed. Please try again.");
    }
  };

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <h2>{event.title}</h2>
      <p><strong>Club:</strong> {event.club}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p>{event.description}</p>

      <Button variant="contained" onClick={() => setOpen(true)}>Register</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Register for {event.title}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              {...register("name", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name ? "Name is required" : ""}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email ? "Email is required" : ""}
            />
            <TextField
              label="Phone"
              type="tel"
              {...register("phone", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone ? "Phone number is required" : ""}
            />
            <TextField
              label="Club"
              defaultValue={event.club}
              {...register("club", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.club}
              helperText={errors.club ? "Club name is required" : ""}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
              <Button type="submit" color="primary">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Events component with fetching from backend
const Events = () => {
  const [events, setEvents] = useState([]); // initially empty
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch events from backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events"); // Your backend URL
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // fetch once when component mounts

  const filteredEvents = events.filter((event) =>
    event.club.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="gg">College Club Association Events</h1>

      <div style={{ margin: "20px", textAlign: "center" }}>
        <TextField
          label="Search by Club Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </div>

      <div className="events-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No events found for the searched club.</p>
        )}
      </div>
    </div>
  );
};

export default Events;