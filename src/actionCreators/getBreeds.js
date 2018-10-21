import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

// It has to return a thunk, are functions to determine later
// at runtime what the value is gonna be
// After AJAX request is made, the thunk determines the actual data
export default function getBreeds() {
  // this is the thunk
  return function getBreedsThunk(dispatch, getState) {
    const { animal } = getState();
    if (animal) {
      petfinder.breed
        .list({ animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            // this.setState({
            //   breeds: data.petfinder.breeds.breed
            // });
            //  we cant' call setState here
            //  we need to dispatch an action
            dispatch({
              type: "SET_BREEDS",
              payload: data.petfinder.breeds.breed
            });
          } else {
            dispatch({
              type: "SET_BREEDS",
              payload: []
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      dispatch({
        type: "SET_BREEDS",
        payload: []
      });
    }
  };
}
