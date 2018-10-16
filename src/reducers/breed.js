export default function breedReducer(state = "", action) {
  switch (action.type) {
    case "SET_BREED":
      return action.payload;
    // This is how one reducer can respond to multiple different
    // action types.
    // Here we check if action type is set_animal
    // and if it is, we return empty string for breed, because
    // when we change the animal, we reset the breed
    case "SET_ANIMAL":
      return "";
    default:
      return state;
  }
}
