import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  componentDidMount() {
    petfinder.breed.list({ animal: "dog" }).then(console.log, console.error);
  }

  render() {
    return (
      <div>
        <h1>Adpot Me</h1>
        <Pet name="Luna" animal="Dog" breed="Havanese" />
        <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
        <Pet name="Doink" animal="Cat" breed="Mixed" />
      </div>
    );
  }
}

render(
  // React.createElement can handle both strings tag
  // or it can handle React Components.
  // They're called this, composite components
  <App />,
  document.getElementById("root")
);
