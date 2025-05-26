import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import noteContext from "../context/notes/noteContext";
import { FaRegEdit } from "react-icons/fa";

// ✅ Helper function to format ISO date to "25 May 2025"
const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // e.g. "25 May 2025"
};

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;

  return (
    <div
      className=" shadow-sm"
      style={{
        height: "70px",
        width: "180px",
        borderRadius: "5px",
        marginLeft: "11px",
        marginTop: "6px",
        backgroundColor: "wheat",
      }}
    >
      <div className="card-body" style={{ fontSize: "5px" }}>
        <div
          className="d-flex justify-content-around flex-wrap"
          style={{ height: "70px", width: "100%" }}
        >
          <div className="" style={{ height: "100%", width: "58%" }}>
            <div
              className="d-flex justify-content-center align-items-end"
              style={{ height: "60%" }}
            >
              <h6>
                <strong>{note.title}</strong>
              </h6>
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "40%", fontSize: "10px" }}
            >
              {/* ✅ Formatted date display */}
              <div className="mx-1">Date - </div>
              {formatDate(note.date)}
            </div>
          </div>
          <div style={{ width: "60px" }}>
            <div className="d-flex justify-content-around ">
              <RiDeleteBin6Line
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
                className="point text-danger"
                size={20}
                style={{ marginTop: "1px" }}
              />
              <FaRegEdit
                onClick={() => {
                  updateNote(note);
                }}
                className="point mx-1 text-primary"
                size={20}
              />
            </div>
            <div className="d-flex justify-content-end   align-items-start">
              <button
                className="btn d-flex justify-content-center align-items-center"
                style={{
                  height: "25px",
                  fontSize: "10px",
                  marginTop: "2px",
                  border: "0px solid black",
                  backgroundColor: "#a7a094",
                  width: "55px",
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
                color: "#892727"
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
