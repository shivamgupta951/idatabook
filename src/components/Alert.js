import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") word = "error";
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div
      style={{
        height: "1px", // Fixed height prevents layout shift
        position: "relative",
        backgroundColor: "black",
      }}
    >
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            margin: "0 auto",
            zIndex: 1000,
            width: "100%",
          }}
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
