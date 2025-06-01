import React, { useContext, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import noteContext from "../context/notes/noteContext";

// ✅ Format ISO date to "25 May 2025"
const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;

  // 🔁 State to handle hover
  const [isHovered, setIsHovered] = useState(false);
  const viewhandler = (note) => {
    props.setNote1({
      title: note.title,
      description: note.description,
    });
    props.setNotebox(true);
  };

  // 💡 Base card style
  const cardContainerStyle = {
    height: "70px",
    width: "180px",
    borderRadius: "5px",
    marginLeft: "11px",
    marginTop: "6px",
    backgroundColor: "wheat",
    transition: "all 0.4s ease-in-out",
    cursor: "pointer",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered
      ? "0 8px 16px rgba(0, 0, 0, 0.3)"
      : "0 1px 5px rgba(0, 0, 0, 0.1)",
  };

  // 🧱 Card inner content style
  const cardBodyStyle = {
    fontSize: "5px",
    transition: "all 0.3s ease-in-out",
    borderRadius: "5px",
  };

  return (
    <div
      className="shadow-sm"
      style={cardContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body" style={cardBodyStyle}>
        <div
          className="d-flex justify-content-around flex-wrap"
          style={{ height: "70px", width: "100%" }}
        >
          <div style={{ height: "100%", width: "58%" }}>
            <div
              className="d-flex justify-content-center align-items-end"
              style={{ height: "60%" }}
            >
              <div style={{ fontSize: "9px", marginBottom: "5px" }}>
                <strong>{note.title}</strong>
              </div>
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "40%", fontSize: "8px" }}
            >
              <div className="mx-1">Created on - </div>
              {formatDate(note.date)}
            </div>
          </div>
          <div style={{ width: "60px" }}>
            <div className="d-flex justify-content-around">
              <RiDeleteBin6Line
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
                className="point text-danger"
                size={20}
                style={{ marginTop: "1px", cursor: "pointer" }}
              />
              <FaRegEdit
                onClick={() => {
                  updateNote(note);
                }}
                className="point mx-1 text-primary"
                size={20}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="d-flex justify-content-end align-items-start">
              <button
                className="btn d-flex justify-content-center align-items-center"
                style={{
                  height: "25px",
                  fontSize: "10px",
                  marginTop: "2px",
                  border: "2px solid grey",
                  backgroundColor: "#a7a094",
                  width: "55px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => {
                  viewhandler(note);
                }}
              >
                view
              </button>
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "19px",
                fontSize: "10px",
                textDecoration: "underline",
                color: "#892727",
              }}
            >
              <strong>{note.tag}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
