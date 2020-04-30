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
            ? "text-font-secondary font-semibold "
            : "text-font-ternary"
        } mx-4`}
      >
        {name}
      </a>
    </Link>
  );
};
