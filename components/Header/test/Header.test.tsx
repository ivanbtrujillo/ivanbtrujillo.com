import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Header } from "../Header";

describe("<Header />", () => {
  test("render", () => {
    const { container } = render(
      <Header>
        <div>Hello</div>
      </Header>
    );
    expect(container).toHaveTextContent("Hello");
  });
});
