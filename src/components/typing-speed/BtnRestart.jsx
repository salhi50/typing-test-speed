import { TfiReload } from "react-icons/tfi";

const BtnRestart = function({restart}) {
  return (
    <button className="btn btn-lg btn-primary flex-shrink-0" onClick={restart}>
      <TfiReload />
      <span className="ms-2 d-md-inline-flex d-none">Restart</span>
    </button>
  )
}

export default BtnRestart;