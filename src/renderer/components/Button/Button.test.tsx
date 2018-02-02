import React from "react";
import sinon from "sinon";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import assert from "assert";
import Button from "./Button";

Enzyme.configure({ adapter: new Adapter() });

describe("Button", () => {
  it("handle click", () => {
    const onClick = sinon.spy();
    const wrapper = Enzyme.shallow(<Button onClick={onClick} />);
    wrapper.simulate("click");
    assert.equal(onClick.callCount, 1);
  });
});
