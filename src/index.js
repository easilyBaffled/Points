import "console.tap/dist-src/polyfill.js";
import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./state";
import { get as getSavedState } from "./dataConnection";
import db from "./dataStore";
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

db.getTasks().then(console.log);

getSavedState().then(payload => {
  console.log(payload);
  store.dispatch({ type: "loadSaveDated", payload });
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
