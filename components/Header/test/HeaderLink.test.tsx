import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HeaderLink } from "../HeaderLink";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("<HeaderLink />", () => {
  test("render", () => {
    useRouter.mockImplementationOnce(() => ({
      pathname: "/",
    }));
    const { container } = render(<HeaderLink name="MyLink" path="/my-link" />);
    expect(container).toHaveTextContent("MyLink");
  });

  test("non active link should be gray and smaller", () => {
    useRouter.mockImplementationOnce(() => ({
      pathname: "/other-page",
    }));
    const { container } = render(<HeaderLink name="MyLink" path="/my-link" />);
    expect(container.firstChild).toHaveClass("text-gray-500 text-sm");
  });

  test("active link should be white text and be bigger", () => {
    useRouter.mockImplementationOnce(() => ({
      pathname: "/my-link",
    }));
    const { container } = render(<HeaderLink name="MyLink" path="/my-link" />);
    expect(container.firstChild).toHaveClass("text-white-300 text-lg");
  });
});
