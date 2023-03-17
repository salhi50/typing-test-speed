import { createContext } from "react";

export const Context = createContext({
  settings: {},
  setSettings: () => {},
  tests: [],
  dispatch: () => {},
})