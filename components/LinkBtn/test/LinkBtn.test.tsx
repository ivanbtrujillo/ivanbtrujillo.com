import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LinkBtn } from "../LinkBtn";

describe("<LinkBtn />", () => {
  test("render", () => {
    const { container } = render(
      <LinkBtn href="/">This is my LinkBtn</LinkBtn>
    );
    expect(container).toHaveTextContent("This is my LinkBtn");
  });
  test("should be a white button whit dark text", () => {
    const { container } = render(
      <LinkBtn href="/">This is my LinkBtn</LinkBtn>
    );
    expect(container.firstChild).toHaveClass(
      "inline-flex rounded-md shadow-sm"
    );
    expect(container.firstChild.firstChild).toHaveClass(
      "inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
    );
  });
});
