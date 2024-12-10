import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import Login from './components/Login';
import Navbar from './components/Navbar'; // Import Navbar component

const App = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null); // Add error state

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setIsAuthenticated(true);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            setError("Login failed. Please try again."); // Set error state
            console.error('Login error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/logout', { method: 'POST' });
            setIsAuthenticated(false);
            setUsername('');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch notes only when the user is authenticated
            axios
                .get("http://localhost:5000/api/notes")
                .then((response) => setNotes(response.data))
                .catch((error) => setError("Error fetching notes.")); // Handle error gracefully
        }
    }, [isAuthenticated]);

    const handleAddNote = () => {
        axios
            .post("http://localhost:5000/api/notes", { title, content })
            .then((response) => {
                setNotes([...notes, response.data]);
                setTitle("");
                setContent("");
            })
            .catch((error) => setError("Error adding note.")); // Handle error
    };

    const handleEditNote = (id, updatedTitle, updatedContent) => {
        axios
            .put(`http://localhost:5000/api/notes/${id}`, { title: updatedTitle, content: updatedContent })
            .then((response) => {
                const updatedNotes = notes.map((note) =>
                    note._id === id ? response.data : note
                );
                setNotes(updatedNotes);
            })
            .catch((error) => setError("Error updating note.")); // Handle error
    };

    const handleDeleteNote = (id) => {
        axios
            .delete(`http://localhost:5000/api/notes/${id}`)
            .then(() => {
                const updatedNotes = notes.filter((note) => note._id !== id);
                setNotes(updatedNotes);
            })
            .catch((error) => setError("Error deleting note.")); // Handle error
    };

    const copyrightStyles = {
        textAlign: 'center',
        width: '100%',
        fontSize: '14px',
        color: '#888',
        marginTop: '20px',  
        padding: '10px 0',
      };

    return (
        <div className="main-container">
            {isAuthenticated ? (
                <>
                    <Navbar 
                        username={username} 
                        handleLogout={handleLogout} 
                    />
                    <div className="app-container">
                        <div className="add-note-container">
                            <AddNote
                                title={title}
                                setTitle={setTitle}
                                content={content}
                                setContent={setContent}
                                onAddNote={handleAddNote}
                            />
                            <a href="" target="_blank" className="gallery-link">
                                Gallery
                            </a>
                        </div>
                        <NoteList
                            notes={notes}
                            onEditNote={handleEditNote}
                            onDeleteNote={handleDeleteNote}
                        />
                    </div>
                </>
            ) : (
                <Login handleLogin={handleLogin} />
            )}
            {/* Copyright Section */}
            <div style={copyrightStyles}>
              <p>&copy; 2024 Mahen Mahindaratne. All Rights Reserved.</p>
            </div>
        </div>
    );    
};

export default App;
