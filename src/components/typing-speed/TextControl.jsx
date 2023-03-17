import { forwardRef } from "react";

import BtnRestart from "./BtnRestart";

const TextControl = forwardRef(function(props, ref) {

  const { value, onChange, restart } = props;

  return <div className="mt-3 d-flex">
    <input value={value} onChange={onChange} ref={ref} type="text" className="form-control form-control-lg fs-5 bg-light flex-grow-1 me-3" autoFocus placeholder="Type here..." />
    <BtnRestart restart={restart} />
  </div>
})

export default TextControl;