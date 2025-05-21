import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import noteContext from "../context/notes/noteContext";
import { FaRegEdit } from "react-icons/fa";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;
  
  return (
    <div className="h-100"> {/* Remove column classes here */}
      <div className="card h-100 shadow-sm"> {/* Added h-100 and shadow */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text flex-grow-1">{note.description}</p>
          <div className="mt-auto"> {/* Align buttons to bottom */}
            <RiDeleteBin6Line 
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }} 
              className="point mx-2 text-danger" 
              size={20}
            />
            <FaRegEdit 
              onClick={() => { updateNote(note); }} 
              className="point mx-2 text-primary" 
              size={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;