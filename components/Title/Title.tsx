import * as React from "react";

type TitleProps = {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
};

export const Title: React.SFC<TitleProps> = ({ children, className }) => {
  return (
    <h1
      className={`text-3xl leading-9 tracking-tight font-extrabold  sm:text-4xl sm:leading-10 text-gray-900  ${
        className || ""
      }`}
    >
      {children}
    </h1>
  );
};
