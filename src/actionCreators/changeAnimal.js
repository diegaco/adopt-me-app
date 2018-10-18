// Thats all action creators do, they take in some sort of data and
// return a well formatted object
export default function changeAnimal(animal) {
  return { type: "SET_ANIMAL", payload: animal };
}
