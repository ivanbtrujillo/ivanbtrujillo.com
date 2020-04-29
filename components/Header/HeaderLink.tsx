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
        className={`text-lg ${
          router.pathname === path
            ? "text-blue-800 font-semibold "
            : "text-gray-700"
        } mx-4`}
      >
        {name}
      </a>
    </Link>
  );
};
