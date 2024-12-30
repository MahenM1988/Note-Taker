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

// Separate connection for logging database
const logDb = mongoose.createConnection(process.env.MONGODB_LOG_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Log = logDb.model("Log", {
    action: String,
    noteId: String,
    title: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
    ipAddress: String
});

// Note Model
const Note = mongoose.model("Note", {
    title: String,
    content: String,
});

// Route to get IP address of the client
app.get("/api/get-ip", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ ip });
});

// Login Route
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ username: req.user.username });
});

// Logout Route
app.post('/logout', (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: 'Logout failed' });
      res.json({ message: 'Logged out successfully' });
    });
});

// Get all notes
app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new note
app.post("/api/notes", async (req, res) => {
    const { title, content, ip } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const note = new Note({ 
        title, 
        content 
    });

    try {
        const newNote = await note.save();

        // Log the action (Add)
        const log = new Log({
            action: 'add',
            noteId: newNote._id,
            title: newNote.title,
            content: newNote.content,
            ipAddress: ip,
        });
        await log.save();

        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Edit an existing note
app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const noteId = req.params.id;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Log the action (Edit) - we log the old note before update
        const log = new Log({
            action: 'edit',
            noteId: note._id,
            title: note.title,
            content: note.content,
            ipAddress: ip,
        });
        await log.save();

        // Update the note with new title and content
        note.title = title;
        note.content = content;
        const updatedNote = await note.save();

        // Log the action (Edit) - after the update
        const updatedLog = new Log({
            action: 'edit',
            noteId: updatedNote._id,
            title: updatedNote.title,
            content: updatedNote.content,
            ipAddress: ip,
        });
        await updatedLog.save();

        res.json(updatedNote);
    } catch (error) {
        res.status(404).json({ message: "Note not found" });
    }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  

    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Log the action (Delete) with the note's details before deletion
        const log = new Log({
            action: 'delete',
            noteId: note._id,
            title: note.title,
            content: note.content,
            ipAddress: ip,
        });
        await log.save();

        // Now delete the note
        await Note.findByIdAndDelete(noteId);

        res.json({ message: "Note deleted successfully", note: { title: note.title, content: note.content } });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
