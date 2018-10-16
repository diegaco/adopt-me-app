export default function locationReducers(state = "Seattle, WA", action) {
  // old way
  // return Object.asssign({}, state, {location: action.payload});
  //
  // New Way with combineReducer
  // With combineReducers all reducers will be call for every single
  // action.
  // Not every action that comes through here it's gonna be a
  // SET_LOCATION action
  // If it is another action.type it's gonna return the state as it was
  // So always have to return something, so you either return the old state
  // or return the new state.
  // Last thing, this has to have a default state. In this case
  // Seattle will be the initial state of App
  switch (action.type) {
    case "SET_LOCATION":
      return action.payload;
    default:
      return state;
  }
}
