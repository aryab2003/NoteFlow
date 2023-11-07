import React from "react";
import "./NoteList.css";
import { toast } from "react-toastify";

function NoteList({ notes, setSelectedNote, deleteNote, togglePinned }) {
  const notifyUpdate = () => {
    toast("Click 'Update' to edit this note", {
      autoClose: 3000,
    });
  };

  const handleEditClick = (note) => {
    setSelectedNote(note);
    notifyUpdate();
    window.scrollTo(0, 0);
  };

  const sortedNotes = [...notes].sort((a, b) => (b.pinned ? 1 : -1));

  return (
    <div className="note-list">
      {sortedNotes.map((note) => (
        <div key={note.id} className={`note ${note.pinned ? "pinned" : ""}`}>
          <h3>{note.title}</h3>
          <p className="tagline">{note.tagline}</p>
          <p>{note.body}</p>
          <button onClick={() => handleEditClick(note)}>Edit</button>
          <button onClick={() => deleteNote(note.id)} className="delete">
            Delete
          </button>
          <button onClick={() => togglePinned(note.id)}>
            {note.pinned ? "Unpin" : "Pin"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
