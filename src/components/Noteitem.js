import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import noteContext from "../context/notes/noteContext";
import { FaRegEdit } from "react-icons/fa";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note , updateNote } = props;
  const {deleteNote} = context;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <RiDeleteBin6Line onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Succesfully","success");}} className="point mx-2"/>
          <FaRegEdit className="point mx-2" onClick={()=>{updateNote(note);}}/>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
