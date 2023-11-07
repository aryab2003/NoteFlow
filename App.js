import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);

  const notesPerPage = 6;

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
  }, []);

  const addNote = (note) => {
    setNotes([...notes, note]);
    localStorage.setItem("notes", JSON.stringify([...notes, note]));
  };

  const updateNote = (id, updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  const togglePinned = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const clearSelectedNote = () => {
    setSelectedNote(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to display toast notifications
  const notify = (message, type = "error") => {
    toast(message, { type });
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="container">
      <h1>NoteFlow</h1>
      <NoteForm
        addNote={addNote}
        updateNote={updateNote}
        selectedNote={selectedNote}
        clearSelectedNote={clearSelectedNote}
        notify={notify} // Pass the notify function
      />
      <NoteList
        notes={currentNotes}
        setSelectedNote={setSelectedNote}
        deleteNote={deleteNote}
        togglePinned={togglePinned}
      />
      <Pagination
        notesPerPage={notesPerPage}
        totalNotes={notes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <ToastContainer autoClose={3000} position="top-right" />
    </div>
  );
}

export default App;
