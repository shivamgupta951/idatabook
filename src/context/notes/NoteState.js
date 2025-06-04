import NoteContext from "./noteContext";
import { useState, useRef, useEffect } from "react";

const NoteState = (props) => {
const host = "https://idatabook-backend.onrender.com";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // ✅ Prevent multiple fetches
  const fetched = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !fetched.current) {
      getNotes();
      fetched.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // ✅ Handle expired token
  const handleAuthError = (status) => {
    if (status === 401 || status === 403) {
      console.warn("Auth error: Token may be invalid or expired");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  // ✅ Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        handleAuthError(response.status);
        throw new Error(`Fetch notes failed: ${response.statusText}`);
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      alert("No Notes Found! ~Add Notes to display them!");
    }
  };

  // ✅ Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        handleAuthError(response.status);
        throw new Error(`Add note failed: ${response.statusText}`);
      }

      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Failed to add note:", error);
      alert("Error adding note. Please try again later.");
    }
  };

  // ✅ Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        handleAuthError(response.status);
        throw new Error(`Delete note failed: ${response.statusText}`);
      }

      const newnotes = notes.filter((note) => note._id !== id);
      setNotes(newnotes);
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Error deleting note. Please try again later.");
    }
  };

  // ✅ Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        handleAuthError(response.status);
        throw new Error(`Edit note failed: ${response.statusText}`);
      }

      await response.json();

      const newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < notes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to edit note:", error);
      alert("Error editing note. Please try again later.");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
