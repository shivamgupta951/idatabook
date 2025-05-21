import React, { useContext } from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Personal",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Added Successfully", "success");
    setNote({
      title: "",
      description: "",
      tag: "Personal",
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2 className="text-center text-md-start">Add a Note</h2>
      <form className="my-3">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
            />
          </div>
          
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
              minLength={5}
              required
            />
          </div>
        </div>
        
        <div className="d-flex justify-content-center justify-content-md-start mt-4">
          <button
            disabled={note.title.length < 2 || note.description.length < 2}
            type="submit"
            className="btn btn-primary px-4 py-2"
            onClick={handleclick}
            style={{ minWidth: "150px" }}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addnote;