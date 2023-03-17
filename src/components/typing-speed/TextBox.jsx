import { forwardRef, useState } from "react";

const TextBox = forwardRef(function({words}, ref) {
  return <div className="border textbox-container bg-light p-3 rounded shadow-sm">
    <div className="textbox overflow-y-hidden">
      <div className="textbox-row" ref={ref}>
        {words}
      </div>
    </div>
  </div>
});

export default TextBox;