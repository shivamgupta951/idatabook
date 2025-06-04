import React, { useContext, useState, useRef, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import Backgroundimage from "../images/Background_image.png";
import cardbackground from "../images/cardbackground.png";
import { CgNotes } from "react-icons/cg";
import { IoIosMail } from "react-icons/io";
/* 
   online database or use versal 
   Also update the logo!
*/
const Notes = (props) => {
  const blurDivStyle = {
    height: "90%",
    width: "80%",
    borderRadius: "25%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(10px)", // for Safari
    border: "5px solid rgba(69, 6, 6, 0.44)",
    fontSize: "12px",
    padding: "30px",
    color: "black",
  };
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [Notebox, setNotebox] = useState(false);
  const [note1, setNote1] = useState({
    title: "",
    description: "",
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

  const mainBoxStyle = {
    height: "70vh",
    width: "56%",
    backgroundColor: "#130C30",
    borderRadius: "2%",
    marginLeft: "10%",
    boxShadow: "0 1px 5px rgba(0,0,0,0.3)",
    cursor: "default",
    outline: "5px solid rgba(74, 39, 103, 0.94)",
  };

  const titleBadgeStyle = {
    backgroundColor: "#8e4d4d",
    color: "black",
    fontWeight: "bold",
    fontFamily: "cursive",
    textAlign: "center",
    padding: "10px 20px",
    width: "fit-content",
    height: "75%",
    marginLeft: "42%",
    clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
  };

  const iconStyle = {
    fontSize: "1.5rem",
    marginTop: "5px",
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
  const closeNotebox = () => {
    setNotebox(false);
    setNote1({
      title: "",
      description: "",
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
  const cardtitle = {
    backgroundImage: `url(${cardbackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "350px",
    width: "350px",
    borderRadius: "25px",
    outline: "5px solid rgba(74, 39, 103, 0.94)",
    marginLeft: "5%",
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
        ref={ref}
      >
        Launch Edit Modal
      </button>

      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              backgroundColor: "#1e1e2f",
              color: "#eaeaea",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              animation: "slideFadeIn 0.5s ease-in-out",
            }}
          >
            <div
              className="modal-header"
              style={{ borderBottom: "1px solid #444" }}
            >
              <h1 className="modal-title fs-5" id="editNoteModalLabel">
                ✏️ Edit Your Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ filter: "invert(1)" }}
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
                    value={note.etitle}
                    minLength={5}
                    maxLength={20}
                    required
                    style={{
                      backgroundColor: "#2c2c3a",
                      color: "white",
                      border: "1px solid #555",
                    }}
                  />
                  <small style={{ color: "white" }}>Max 20 characters.</small>
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
                    value={note.edescription}
                    minLength={5}
                    maxLength={300}
                    required
                    style={{
                      backgroundColor: "#2c2c3a",
                      color: "white",
                      border: "1px solid #555",
                    }}
                  />
                  <small style={{ color: "white" }}>Max 300 characters.</small>
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
                    value={note.etag}
                    minLength={3}
                    maxLength={10}
                    required
                    style={{
                      backgroundColor: "#2c2c3a",
                      color: "white",
                      border: "1px solid #555",
                    }}
                  />
                  <small style={{ color: "white" }}>Max 10 characters.</small>
                </div>
              </form>
            </div>
            <div
              className="modal-footer d-flex flex-wrap justify-content-center justify-content-md-end gap-2"
              style={{ borderTop: "1px solid #444" }}
            >
              <button
                ref={refClose}
                type="button"
                className="btn btn-outline-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 2 || note.edescription.length < 2
                }
                type="button"
                className="btn btn-success"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Home page layout */}
      <div
        className="d-flex justify-content-start align-items-center"
        style={backgroundStyle}
      >
        <div className="main-box" style={mainBoxStyle}>
          <div className="titlesetion d-flex" style={{ height: "20%" }}>
            <div className="" style={titleBadgeStyle}>
              Your Notes
              <div>
                <CgNotes style={iconStyle} />
              </div>
            </div>
            <Addnote showAlert={props.showAlert} notesCount={notes.length} />
          </div>
          <div
            className="d-flex justify-content-around align-items-center"
            style={{ height: "65%", width: "100%" }}
          >
            <div style={{ height: "8%", width: "4%" }}></div>
            <div
              className="d-flex flex-wrap"
              style={{ height: "100%", width: "100%" }}
            >
              {notes.length === 0 ? (
                <div
                  className="notesempty text-center"
                  style={{
                    color: "wheat",
                    fontSize: "25px",
                    marginTop: "135px",
                    marginLeft: "290px",
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
                  setNote1={setNote1}
                  setNotebox={setNotebox}
                />
              ))}
            </div>
            <div style={{ height: "8%", width: "4%" }}></div>
          </div>
        </div>
        {Notebox ? (
          <div style={cardtitle}>
            <div
              className="d-flex justify-content-end"
              style={{ height: "10%" }}
            >
              <div
                style={{
                  backgroundColor: "red",
                  width: "7%",
                  borderRadius: "5px",
                  height: "70%",
                  marginRight: "3%",
                  marginTop: "5px",
                }}
              >
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  style={{ filter: "invert(1)", color: "black" }}
                  onClick={closeNotebox}
                ></button>
              </div>
            </div>
            <div
              className="NoteBox d-flex justify-content-center align-items-center"
              style={{ height: "30%" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "80%",
                  backgroundColor: "#994a4a",
                  borderRadius: "7%",
                  height: "80%",
                  color: "white",
                  fontSize: "10px",
                  padding: "40px",
                  border: "5px solid rgba(15, 15, 15, 0.84)",
                }}
              >
                {note1.title}
              </div>
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60%" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={blurDivStyle}
              >
                {note1.description}
              </div>
            </div>
          </div>
        ) : (
          <div style={{border: "2px solid black",height: "300px",width: "300px",marginLeft: "8%",borderRadius: "20px",backgroundColor: "black"}}>
            <div className="d-flex justify-content-center align-items-end" style={{height: "20%",color: "green"}}><h3>Note box</h3></div>
            <div className="d-flex justify-content-center"><IoIosMail size={250} color="yellow"/></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
