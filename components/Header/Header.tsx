import * as React from "react";

type HeaderProps = {
  children: React.ReactChild | React.ReactChild[];
};

export const Header: React.SFC<HeaderProps> = ({ children }) => (
  <header className="bg-gray-900 flex items-center border-b border-gray-300 p-4 h-16 text-gray-300 text-center flex ">
    {children}
  </header>
);
