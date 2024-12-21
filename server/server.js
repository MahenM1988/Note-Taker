require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const users = [{ id: 1, username: 'Admin', password: bcrypt.hashSync('123', 10) }];

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

const Note = mongoose.model("Note", {
    title: String,
    content: String,
    ip: String,
    timestamp: { type: Date, default: Date.now }  
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ username: req.user.username });
});
  
app.post('/logout', (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: 'Logout failed' });
      res.json({ message: 'Logged out successfully' });
    });
});

app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/notes", async (req, res) => {
    const { title, content, ip } = req.body;

    if (!title || !content || !ip) {
        return res.status(400).json({ message: 'Title, content, and IP address are required.' });
    }

    const note = new Note({ 
        title, 
        content, 
        ip,
        timestamp: new Date()  
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put("/api/notes/:id", async (req, res) => {
    const { title, content, ip } = req.body;
    const noteId = req.params.id;

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {
                title,
                content,
                ip,
                timestamp: new Date()  
            },
            { new: true }
        );

        res.json(updatedNote); 
    } catch (error) {
        res.status(404).json({ message: "Note not found" });
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id;

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ message: "Note deleted successfully", note: deletedNote });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
