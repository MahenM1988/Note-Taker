import React, { useState, useEffect } from "react";

const AddNote = ({ title, setTitle, content, setContent, onAddNote, onEditNote, noteId }) => {
    const [ip, setIp] = useState('');

    useEffect(() => {
        const getPublicIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIp(data.ip); 
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        getPublicIP();
    }, [noteId]); 

    const handleAddNote = () => {
        onAddNote(ip);  
    };

    const handleEditNote = () => {
        onEditNote(noteId, ip);  
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
