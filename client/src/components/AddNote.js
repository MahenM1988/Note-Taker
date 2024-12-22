import React, { useEffect, useState } from "react";

const AddNote = ({ title, setTitle, content, setContent, onAddNote, onEditNote, noteId }) => {

    const [ip, setIp] = useState('');

    useEffect(() => {
        const getIpAddress = async () => {
            const response = await fetch('/api/get-ip');
            const data = await response.json();
            setIp(data.ip);
        };

        getIpAddress();
    }, []);

    const handleAddNote = () => {
        console.log('Adding note with title:', title, 'and content:', content); 
        onAddNote(title, content, ip); 
    };

    const handleEditNote = () => {
        console.log('Editing note with ID:', noteId, 'and title:', title, 'and content:', content); 
        onEditNote(noteId, title, content, ip); 
    };

    return (
        <div key={noteId}>
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
