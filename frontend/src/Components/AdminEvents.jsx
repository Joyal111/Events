import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    club: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    image: ""
  });

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:3000/events");
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpen = (event = null) => {
    setEditingEvent(event);
    if (event) {
      setFormData(event);
    } else {
      setFormData({ title: "", club: "", date: "", time: "", venue: "", description: "", image: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
    setFormData({ title: "", club: "", date: "", time: "", venue: "", description: "", image: "" });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingEvent) {
        await axios.put(`http://localhost:3000/events/${editingEvent._id}`, formData);
      } else {
        await axios.post("http://localhost:3000/events", formData);
      }
      fetchEvents();
      handleClose();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await axios.delete(`http://localhost:3000/events/${id}`);
      fetchEvents();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Event Manager</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: "20px" }}>
        Add New Event
      </Button>

      {events.map(event => (
        <div key={event._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
          <h2>{event.title}</h2>
          <p><strong>Club:</strong> {event.club}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          <p>{event.description}</p>
          <img src={event.image} alt={event.title} style={{ width: "100px" }} />
          <div style={{ marginTop: "10px" }}>
            <Button variant="outlined" color="secondary" onClick={() => handleOpen(event)} style={{ marginRight: "10px" }}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(event._id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
        <DialogContent>
          {["title", "club", "date", "time", "venue", "description", "image"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{editingEvent ? "Update" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
