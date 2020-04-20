import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type HeaderLinkProps = {
  path: string;
  name: string;
};

export const HeaderLink: React.SFC<HeaderLinkProps> = ({ path, name }) => {
  const router = useRouter();
  return (
    <Link href={`${path}`}>
      <a
        className={`${
          router.pathname === path
            ? "text-white-300 text-lg"
            : "text-gray-500 text-sm"
        } mx-1`}
      >
        {name}
      </a>
    </Link>
  );
};
