import React, { useState, useEffect } from "react";

const AddNote = ({ title, setTitle, content, setContent, onAddNote, onEditNote, noteId }) => {
    const [ip, setIp] = useState('');

    useEffect(() => {
        // Fetch the user's public IP address when the component mounts or when editing a note
        const getPublicIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIp(data.ip); // Store the user's IP address
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        getPublicIP();
    }, [noteId]); // Trigger fetching IP when noteId changes (for editing)

    const handleAddNote = () => {
        onAddNote(ip);  // Pass IP to the parent component (App.js) for adding a note
    };

    const handleEditNote = () => {
        onEditNote(noteId, ip);  // Pass IP to the parent component (App.js) for updating a note
    };

    return (
        <div>
            <h2>{noteId ? "Edit Note" : "Add Note"}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button className="button1" onClick={noteId ? handleEditNote : handleAddNote}>
                {noteId ? "Update Note" : "Add Note"}
            </button>
        </div>
    );
};

export default AddNote;
