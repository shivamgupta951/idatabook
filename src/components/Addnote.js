import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { CiSquarePlus } from "react-icons/ci";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Personal",
  });

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    addNote(note.title, note.description, note.tag);
    props.showAlert("Added Successfully", "success");
    setNote({ title: "", description: "", tag: "Personal" });
    setShowModal(false);
  };

  const openAddNoteModal = () => {
    if (props.notesCount < 16) {
      setShowModal(true);
    } else {
      props.showAlert(
        "Notes limit exceeded for free version! Only 16 Notes are allowed.",
        "danger"
      );
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addNoteBadgeStyle = {
    backgroundColor: "#e04b4b",
    color: "white",
    fontWeight: "bold",
    height: "50%",
    fontSize: "1rem",
    border: "none",
    padding: "10px 30px",
    cursor: props.notesCount >= 16 ? "not-allowed" : "pointer",
    clipPath: "ellipse(85% 55% at 50% 45%)",
    transition: "all 0.3s ease-in-out",
    marginLeft: "20%",
    opacity: props.notesCount >= 16 ? 0.5 : 1,
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <>
      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1040,
            }}
            onClick={() => setShowModal(false)}
          ></div>

          <div
            className="modal-dialog modal-dialog-centered"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              width: "90%",
              maxWidth: "500px",
              animation: "slideFadeIn 0.5s ease-in-out",
            }}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "#1e1e2f",
                color: "#eaeaea",
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                className="modal-header"
                style={{ borderBottom: "1px solid #444" }}
              >
                <h1 className="p-3 modal-title fs-5">📝 Add a New Note</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  style={{ filter: "invert(1)" }}
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="m-3">
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
                      maxLength={20}
                      required
                      style={{
                        backgroundColor: "#2c2c3a",
                        color: "white",
                        border: "1px solid #555",
                      }}
                    />
                    <small className="form-text text-muted">
                      Max 20 characters.
                    </small>
                  </div>
                  <div className="m-3">
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
                      style={{
                        backgroundColor: "#2c2c3a",
                        color: "white",
                        border: "1px solid #555",
                      }}
                    />
                  </div>
                  <div className="m-3">
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
                      minLength={3}
                      maxLength={10}
                      required
                      style={{
                        backgroundColor: "#2c2c3a",
                        color: "white",
                        border: "1px solid #555",
                      }}
                    />
                    <small className="form-text text-muted">
                      Max 10 characters.
                    </small>
                  </div>
                </form>
              </div>
              <div
                className="p-3 modal-footer d-flex flex-wrap justify-content-center justify-content-md-end gap-2"
                style={{ borderTop: "1px solid #444" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-light m-2"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  disabled={
                    note.title.length < 2 || note.description.length < 2
                  }
                  type="button"
                  className="btn btn-success m-1"
                  onClick={handleClick}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <button
        onClick={openAddNoteModal}
        style={addNoteBadgeStyle}
        title={
          props.notesCount >= 16
            ? "Free limit reached (16 notes max)"
            : "Add a new note"
        }
      >
        <CiSquarePlus
          style={{ color: "white", marginRight: "2px", marginBottom: "2px" }}
          size={25}
        />
        Add Note
      </button>
    </>
  );
};

export default Addnote;
