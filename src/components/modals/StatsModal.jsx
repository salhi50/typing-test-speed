import Modal from './Modal';
import Table from '../Table';
import { useContext } from 'react';
import { Context } from '../../context';

const titles = [
  {short: "#", long: "Rank"},
  {short: "T", long: "Time"},
  {short: "D", long: "Date"},
  {short: "TW", long: "Total words"},
  {short: "CW", long: "Correct words"},
  {short: "WW", long: "Wrong words"},
  {short: "A", long: "Accuracy"},
  {short: "K", long: "Keystrokes"},
  {short: "C", long: "Completed"},
]


const StatsModal = function() {

  const { tests } = useContext(Context);

  return <Modal title="Stats" dialogClass="modal-fullscreen" id="stats-modal">
    <div className="container-lg">
      <div className="d-flex flex-wrap mb-3">
        {titles.map((title, index) => {
          return <div className="me-3" key={index}>
            <strong>{title.short}: </strong>
            <span>{title.long}</span>
          </div>
        })}
      </div>
      <Table titles={titles.map(t => t.short)}>
        {tests.map(({stats, date, time, completed}, index) => {
          return <tr key={index}>
            <td>{index + 1}</td>
            <td>{time}</td>
            <td>{date.toLocaleString()}</td>
            <td>{completed ? stats["Total words"] : ""}</td>
            <td>{completed ? stats["Correct words"] : ""}</td>
            <td>{completed ? stats["Wrong words"] : ""}</td>
            <td>{completed ? stats.Accuracy : ""}</td>
            <td>{completed ? stats.Keystrokes : ""}</td>
            <td>{completed.toString()}</td>
          </tr>
        })}
      </Table>
    </div>
  </Modal>
}

export default StatsModal;