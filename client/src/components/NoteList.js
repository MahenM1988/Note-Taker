import React from "react";

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
    return (
        <ul>
            {notes.map((note) => (
                <li key={note._id}>
                    <strong>{note.title}</strong>
                    <p>{note.content}</p>

                    {/* Display the IP */}
                    <p><em>IP: {note.ip}</em></p>

                    {/* Display the timestamp */}
                    <p><em>Created on: {new Date(note.timestamp).toLocaleString()}</em></p> {/* Format timestamp */}

                    <button
                        className="button2"
                        style={{ marginRight: "15px" }}
                        onClick={() =>
                            onEditNote(
                                note._id,
                                prompt("Enter updated title:", note.title),
                                prompt("Enter updated content:", note.content)
                            )
                        }
                    >
                        Edit
                    </button>
                    <button
                        className="button2"
                        onClick={() => onDeleteNote(note._id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default NoteList;
