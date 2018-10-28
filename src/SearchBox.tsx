import React, { Component } from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

interface Props {
  search: () => void;
}

class SearchBox extends Component<Props> {
  public render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <label htmlFor="location">
              Location
              <input
                id="location"
                value={context.location}
                placeholder="Location"
                type="text"
                onChange={context.handleLocationChange}
              />
            </label>

            <label htmlFor="animal">
              Animal
              <select
                id="animal"
                value={context.animal}
                onChange={context.handleAnimalChange}
                onBlur={context.handleAnimalChange}
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
                value={context.breed}
                onChange={context.handleBreedChange}
                onBlur={context.handleBreedChange}
                name=""
                disabled={!context.breeds.length}
              >
                <option value="All">- All -</option>
                {context.breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" onClick={this.props.search}>
              Send
            </button>
          </div>
        )}
      </Consumer>
    );
  }
}
export default SearchBox;
