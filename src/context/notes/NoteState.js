import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNGI0OWU2MTQ5N2FjMzg2NmY3N2Q2In0sImlhdCI6MTc0NzM3NTc0NX0.lGTqfABpvRkfTogFHExiaX_fS7D34sR4elG0Wg8gQ6k",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // add a node
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNGI0OWU2MTQ5N2FjMzg2NmY3N2Q2In0sImlhdCI6MTc0NzM3NTc0NX0.lGTqfABpvRkfTogFHExiaX_fS7D34sR4elG0Wg8gQ6k",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  // delete a node
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNGI0OWU2MTQ5N2FjMzg2NmY3N2Q2In0sImlhdCI6MTc0NzM3NTc0NX0.lGTqfABpvRkfTogFHExiaX_fS7D34sR4elG0Wg8gQ6k",
      },
    });
    const json = response.json();
    console.log(json);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };
  // edit a node
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNGI0OWU2MTQ5N2FjMzg2NmY3N2Q2In0sImlhdCI6MTc0NzM3NTc0NX0.lGTqfABpvRkfTogFHExiaX_fS7D34sR4elG0Wg8gQ6k",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
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
