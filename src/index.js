import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Container from "./components/Container";
import { store } from './state/store/store';
import "./index.less";


ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.querySelector("#root")
);
