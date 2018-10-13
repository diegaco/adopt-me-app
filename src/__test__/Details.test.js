import React from "react";
import { create } from "react-test-renderer";
import Details from "../Details";

// A snapshot checks if the markup changes in the future
// It expect to stay the same over time.
// It's a good easy-to-write, low confidence test that like.
// This looked like this before and I expect this to continue looking
// like this
test("snapshot", () => {
  const c = create(<Details />);
  expect(c.toJSON()).toMatchSnapshot();
});

test("shows modal when toggleModal is called", () => {
  const c = create(<Details search={() => {}} />);
  const instance = c.getInstance();

  expect(instance.state.showModal).toBe(false);
  instance.toggleModal();
  expect(instance.state.showModal).toBe(true);
});
