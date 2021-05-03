import React from "react";
import { Home } from "../../pages/index";
import { fireEvent, render } from "../testUtils";

describe("Home page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Home />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it("clicking button triggers alert", () => {
    const { getByText } = render(<Home />, {});
    window.alert = jest.fn();
    fireEvent.click(getByText("Test Button"));
    expect(window.alert).toHaveBeenCalledWith("With typescript and Jest");
  });
});
