import React, { useContext, useState, useRef, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      getNotes();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id, 
      etitle: currentNote.title, 
      edescription: currentNote.description, 
      etag: currentNote.tag
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleclick = () => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      
      {/* Hidden button for modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      
      {/* Edit Note Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button 
                disabled={note.etitle.length < 2 || note.edescription.length < 2} 
                type="button" 
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes List - Fixed responsive grid */}
      <div className="container my-3">
        <h2 className="mb-3">Your Notes</h2>
        <div className="text-center my-4">
          {notes.length === 0 && 'No notes to display'}
        </div>
        <div className="row">
          {notes.map((note) => (
            <div 
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4" 
              key={note._id}
            >
              <Noteitem 
                updateNote={updateNote} 
                note={note} 
                showAlert={props.showAlert}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;