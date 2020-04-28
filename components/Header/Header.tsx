import * as React from "react";

type HeaderProps = {
  children: React.ReactChild | React.ReactChild[];
};

export const Header: React.SFC<HeaderProps> = ({ children }) => (
  <header className=" bg-white sticky top-0 items-center border-b border-gray-300 p-4 h-64 text-gray-300 text-center ">
    {children}
  </header>
);
