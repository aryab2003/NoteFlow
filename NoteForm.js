import React, { useState } from "react";

function NoteForm({
  addNote,
  updateNote,
  selectedNote,
  clearSelectedNote,
  notify,
}) {
  const [note, setNote] = useState(
    selectedNote || { title: "", tagline: "", body: "" }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.body) {
      notify("Please fill in both the title and body fields", "error");
      return;
    }

    if (selectedNote) {
      updateNote(selectedNote.id, note);
      clearSelectedNote();
      notify("Note updated successfully", "success");
    } else {
      addNote(note);
      notify("Note added successfully", "success");
    }

    setNote({ title: "", tagline: "", body: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleInputChange}
        onKeyPress={handleEnterKeyPress}
      />
      <input
        type="text"
        name="tagline"
        placeholder="Tagline"
        value={note.tagline}
        onChange={handleInputChange}
        onKeyPress={handleEnterKeyPress}
      />
      <textarea
        name="body"
        placeholder="Body"
        value={note.body}
        onChange={handleInputChange}
        onKeyPress={handleEnterKeyPress}
      />
      <button type="submit">{selectedNote ? "Update" : "Add Note"}</button>
    </form>
  );
}

export default NoteForm;
