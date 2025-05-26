import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Personal",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = () => {
    refClose.current.click();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Added Successfully", "success");
    setNote({
      title: "",
      description: "",
      tag: "Personal",
    });
  };

  const openAddNoteModal = () => {
    ref.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hidden trigger button for opening Add Note modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#addNoteModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* Modal for adding a note */}
      <div
        className="modal fade"
        id="addNoteModal"
        tabIndex="-1"
        aria-labelledby="addNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addNoteModalLabel">
                Add a Note
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
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChange}
                    value={note.title}
                    minLength={5}
                    maxLength={10}  // ✅ Limit to 10 characters
                    required
                  />
                  <small className="form-text text-muted">
                    Max 10 characters allowed.
                  </small> {/* ✅ Tip for user */}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
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
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                    minLength={5}
                    maxLength={10}  // ✅ Limit to 10 characters
                    required
                  />
                  <small className="form-text text-muted">
                    Max 10 characters allowed.
                  </small> {/* ✅ Tip for user */}
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
                disabled={note.title.length < 2 || note.description.length < 2}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Button to open the Add Note modal */}
      <button className="btn btn-primary px-4 py-2" onClick={openAddNoteModal}>
        Add Note
      </button>
    </>
  );
};

export default Addnote;
