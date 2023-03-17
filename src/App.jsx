import { useReducer, useState} from "react";
import { createPortal } from "react-dom";
import settings from "./data.json";
import { Context } from "./context";


import Header from "./layout/Header";
import StatsModal from "./components/modals/StatsModal";
import SettingsModal from "./components/modals/SettingsModal";
import TypingBox from "./components/typing-speed/TypingBox";
import { testReducer } from "./reducer";

let defaultSettings = settings.defaultSettings;

const App = function() {

  const [settings, setSettings] = useState(defaultSettings);
  const [tests, dispatch] = useReducer(testReducer, []);

  const value = {settings, setSettings, tests, dispatch};

  return (
    <Context.Provider value={value}>
      <div className="wrapper d-flex flex-column vh-100 overflow-y-auto">
        <Header />
        <main className="flex-grow-1 flex-center container-lg">
          <TypingBox settings={settings} />
        </main>
        {createPortal(<StatsModal />, document.body)}
        {createPortal(<SettingsModal />, document.body)}
    </div>
    </Context.Provider>
  )
}

export default App;