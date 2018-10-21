import React, { Component } from "react";
import { ANIMALS } from "petfinder-client";
import { connect } from "react-redux";
import getBreeds from "./actionCreators/getBreeds";
import changeBreed from "./actionCreators/changeBreed";
import changeAnimal from "./actionCreators/changeAnimal";
import changeLocation from "./actionCreators/changeLocation";

class SearchBox extends Component {
  handleFormSubmit = evt => {
    evt.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <div className="search-params">
        <form action="" onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={this.props.location}
              placeholder="Location"
              type="text"
              onChange={this.props.handleLocationChange}
            />
          </label>

          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={this.props.animal}
              onChange={this.props.handleAnimalChange}
              onBlur={this.props.handleAnimalChange}
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
              value={this.props.breed}
              onChange={this.props.handleBreedChange}
              onBlur={this.props.handleBreedChange}
              name=""
              disabled={!this.props.breeds.length}
            >
              <option value="All">- All -</option>
              {this.props.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ breed, breeds, animal, location }) => ({
  breed,
  breeds,
  animal,
  location
});

// with these we make changes & dispatching actions to redux
const mapDispatchToProps = dispatch => ({
  handleAnimalChange(ev) {
    dispatch(changeAnimal(ev.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(ev) {
    dispatch(changeBreed(ev.target.value));
  },
  handleLocationChange(ev) {
    dispatch(changeLocation(ev.target.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
