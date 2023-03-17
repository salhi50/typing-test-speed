import StatsCard from "../StatsCard";
import BtnRestart from "./BtnRestart";

const Result = function({restart, data = []}) {
  return <div className="row">
    <div className="col-md-6 col-12 mb-3">
      <StatsCard title="Result" className="result" data={data}/>
    </div>
    <div className="col-md-6 col-12">
      <BtnRestart restart={restart} />
    </div>
  </div>
}

export default Result;