import React, { Component } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import pf from "petfinder-client";
import Loadable from "react-loadable";
import { Provider } from "./SearchContext";
import Navbar from "./Navbar";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

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
  constructor(props) {
    super(props);
    this.state = {
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  handleAnimalChange = ev => {
    this.setState(
      {
        animal: ev.target.value,
        breed: ""
      },
      this.getBreeds
    ); // optional method to run after setState runs.
    // this.getBreeds();
    // call this method here will not work
    //because react batches together all the updates
    // into one atomic update.
    // So it's not guaranteed that, that's going to flush inmediately.
  };

  handleBreedChange = ev => {
    this.setState({
      breed: ev.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({
              breeds: []
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  render() {
    return (
      <div>
        <ReduxProvider store={store}>
          <Provider value={this.state}>
            <Navbar />
            <Router>
              <LoadableResults path="/" />
              <LoadableDetails path="/details/:id" />
              <LoadableSearchParams path="/search-params" />
            </Router>
          </Provider>
        </ReduxProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
