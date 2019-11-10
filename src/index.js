import "console.tap/dist-src/polyfill.js";
import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./reducers";
const store = createStore(reducer);

console.log(store);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
