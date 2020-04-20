import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Title } from "../Title";

describe("<Title />", () => {
  test("render", () => {
    const { container } = render(<Title>This is my title</Title>);
    expect(container).toHaveTextContent("This is my title");
  });
  test("should render a big text", () => {
    const { container } = render(<Title>This is my title</Title>);
    expect(container.firstChild).toHaveClass("text-3xl leading-9");
  });
});
