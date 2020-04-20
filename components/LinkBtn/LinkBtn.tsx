import * as React from "react";
import Link, { LinkProps } from "next/link";

type LinkBtnProps = {
  children: React.ReactChild;
} & LinkProps;

export const LinkBtn: React.SFC<LinkBtnProps> = ({ children, ...props }) => (
  <Link {...props}>
    <a className="inline-flex rounded-md shadow-sm">
      <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
        {children}
      </span>
    </a>
  </Link>
);
