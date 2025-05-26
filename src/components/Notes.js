import React, { useContext, useState, useRef, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import Backgroundimage from "../images/Background_image.png";

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

  const ref = useRef(null);
  const refClose = useRef(null);
  const backgroundStyle = {
    backgroundImage: `url(${Backgroundimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "92vh",
    width: "100%",
    padding: "5% 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "oblique",
  };
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* 🔧 Hidden trigger for Edit Note modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal" // ✅ updated ID
        ref={ref}
      >
        Launch Edit Modal
      </button>

      {/* ✅ Edit Note Modal - ID updated from "exampleModal" to "editNoteModal" */}
      {/* ✅ Edit Note Modal */}
      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editNoteModalLabel">
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
                    maxLength={10} // ✅ Limit to 10 characters
                    required
                    value={note.etitle}
                  />
                  <small className="form-text text-muted">
                    Max 10 characters allowed.
                  </small>{" "}
                  {/* ✅ Tip for user */}
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
                    maxLength={10} // ✅ Limit to 10 characters
                    required
                    value={note.etag}
                  />
                  <small className="form-text text-muted">
                    Max 10 characters allowed.
                  </small>{" "}
                  {/* ✅ Tip for user */}
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
                disabled={
                  note.etitle.length < 2 || note.edescription.length < 2
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Home page code-> */}
      <div
        className="d-flex justify-content-around align-items-center"
        style={backgroundStyle}
      >
        <div
          className="border"
          style={{
            height: "70vh",
            width: "56%",
            backgroundColor: "#130C30",
            borderRadius: "2%",
            marginLeft: "5%",
          }}
        >
          <div className="border" style={{ height: "25%" }}>
            <Addnote showAlert={props.showAlert} />
          </div>
          <div
            className="border d-flex justify-content-around align-items-center"
            style={{ height: "65%", width: "100%" }}
          >
            <div className="" style={{ height: "8%", width: "4%" }}></div>
            <div
              className="border d-flex flex-wrap"
              style={{ height: "100%", width: "100%" }}
            >
              {notes.length === 0 ? (
                <div
                  className="notesempty text-center"
                  style={{
                    color: "wheat",
                    fontSize: "25px",
                    marginTop: "135px",
                    marginLeft: "210px",
                  }}
                >
                  No notes to display
                </div>
              ) : (
                ""
              )}
              {notes.map((note) => (
                <Noteitem
                  key={note._id}
                  updateNote={updateNote}
                  note={note}
                  showAlert={props.showAlert}
                />
              ))}
            </div>
            <div className="" style={{ height: "8%", width: "4%" }}></div>
          </div>
        </div>
        <div className="border" style={{ height: "350px", width: "250px" }}>
          {" "}
          Hello
        </div>
      </div>
    </>
  );
};

export default Notes;
