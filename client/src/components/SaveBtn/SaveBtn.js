import React from "react";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn() {
  return (
    <button className="btn btn-success save-btn">
      Save Book
    </button>
  );
}

export default SaveBtn;
