import React, { Component } from "react";
import pf from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { connect } from "react-redux";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.search();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: this.props.location,
        animal: this.props.animal,
        breed: this.props.breed
      })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        if (this._isMounted) {
          this.setState({
            pets: pets
          });
        }
      });
  };

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

// this is comming from Redux store
const mapStateToProps = ({ location, breed, animal }) => ({
  location,
  breed,
  animal
});

// here we passes redux store to Results as props
export default connect(mapStateToProps)(Results);
