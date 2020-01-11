import "console.tap/dist-src/polyfill.js";
import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./state";
import { get as getSavedState } from "./dataConnection";
import { tasksDb, bankDb, rewardsDb, clearCache } from "./dataStore";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// tasksDb.get().then(console.log);
tasksDb
  .get()
  .then(console.tap)
  .then(payload => store.dispatch({ type: "loadTasks", payload }));
bankDb
  .get()
  .then(res => console.tap(res, "bank"))
  .then(payload => store.dispatch({ type: "loadBank", payload }));
// rewardsDb
//   .get()
//   .then(payload => store.dispatch({ type: "loadRewards", payload }));

getSavedState().then(payload => {
  console.log(payload);
  store.dispatch({ type: "loadSaveData", payload });
});

render(
  <Provider store={store}>
    <button onClick={() => clearCache()}>Clear Cache</button>
    <App />
  </Provider>,
  document.getElementById("root")
);
