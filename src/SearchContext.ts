/* tslint:disable no-empty */
import React from "react";

const { Provider, Consumer } = React.createContext({
  location: "Seattle, WA",
  animal: "",
  breed: "",
  breeds: [] as string[],
  handleAnimalChange(event: React.ChangeEvent<HTMLSelectElement>) {},
  handleBreedChange(event: React.ChangeEvent<HTMLSelectElement>) {},
  handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {},
  getBreeds() {}
});

export { Provider, Consumer };
