import React, { Component } from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class SearchParams extends Component {
  state = {
    location: "Seattle., WA",
    animal: "",
    breed: "",
    breeds: []
  };

  handleLocationChange = ev => {
    this.setState({
      location: ev.target.value
    });
  };

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
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={this.state.location}
            placeholder="Location"
            type="text"
            onChange={this.handleLocationChange}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
            name=""
          >
            <option value="All">- All -</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={this.state.breed}
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
            name=""
            disabled={!this.state.breeds.length}
          >
            <option value="All">- All -</option>
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Send</button>
      </div>
    );
  }
}

export default SearchParams;
