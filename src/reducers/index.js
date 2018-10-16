import { combineReducers } from "redux";
import location from "./location";
import animal from "./animal";
import breeds from "./breeds";
import breed from "./breed";

// A reducer is a function that adheres to just a particular contract,
// takes an old state, an action and returns new state
// It's a pure function, has no side effect

// Example of the Old way
// state = { location: 'Seattle, WA' };
// action = {type: "SET_LOCATION", payload: "San Fransisco, CA" };
//
// This root reducer all this does, it delegates to another reducer
// THis rootReducer, 100% of what it does is just handout to other reduces and
// return their values
// const rootReducer = function(state, action) {
//   switch(action.type){
//     case "SET_LOCATION":
//       return location(state,action);
//   }
// }

// Helper function
export default combineReducers({
  location,
  animal,
  breeds,
  breed
});
