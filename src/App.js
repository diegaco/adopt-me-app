import React, { Component } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import store from "./store";

const LoadableDetails = Loadable({
  loader: () => import("./Details"),
  loading() {
    return <h1>Loading split out code...</h1>;
  }
});

const LoadableResults = Loadable({
  loader: () => import("./Results"),
  loading() {
    return <h1>Loading split out code...</h1>;
  }
});

const LoadableSearchParams = Loadable({
  loader: () => import("./SearchParams"),
  loading() {
    return <h1>Loading split out code...</h1>;
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Navbar />
          <Router>
            <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" />
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
