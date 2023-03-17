import { useContext } from 'react';
import { Context } from "../../context";
import Modal from "./Modal";
import settings from '../../data.json';

let defaultSettings = settings.defaultSettings;

const timeOptions = {
  name: "time",
  options: [
    {label: "15s", title:"15 seconds", id: "s15", value:"15000"},
    {label: "30s", title:"30 seconds", id: "s30", value: "30000"},
    {label: "1m", title:"1 minute", id: "m1", value: "60000"}
  ]
}

const wordsReg = /^[a-zA-Z][a-zA-Z-]+$/;

const SettingsModal = function() {

  const { settings, setSettings } = useContext(Context);

  const wordsSeparator = settings.words.separator;

  const handleCheck = (e) => {
    if(e.target.checked) {
      setSettings({
        ...settings,
        time: e.target.value
      })
    }
  }

  const handleChange = (e) => {
    let value = e.target.value.replace(/\s/g, "").replace(/[-]{2,}/g, "-");
    setSettings({
      ...settings,
      words: {
        ...defaultSettings.words,
        menu: wordsReg.test(value)? value.split(wordsSeparator): defaultSettings.words.menu
      }
    })
  }

  return <Modal title="Settings" id="settings-modal" dialogClass="modal-lg">
    <label className="form-label fw-semibold">Time</label>
    <div className="mb-3 d-flex align-items-center">
      {timeOptions.options.map(({label,title,id,value}, index) => {
        return (
          <div className="form-check me-3" key={index} title={title}>
            <label htmlFor={id} className="form-check-label">{label}</label>
            <input onChange={handleCheck} required defaultChecked={value === settings.time} value={value} type="radio" name={timeOptions.name} id={id} className="form-check-input" />
          </div>
        )
      })}
    </div>
    <div className="form-group mb-3">
      <label className="form-label fw-semibold" htmlFor="words">Words(separated by "{wordsSeparator}")</label>
      <textarea onChange={handleChange} spellCheck="false" required defaultValue={settings.words.menu.join(wordsSeparator)} rows="5" name="words" id="words" className="form-control"></textarea>
    </div>
  </Modal>
}

export default SettingsModal;