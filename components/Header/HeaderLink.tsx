import Link from "next/link";
import {useRouter} from "next/router";

type HeaderLinkProps = {
  path: string;
  name: string;
};

export const HeaderLink: React.FC<HeaderLinkProps> = ({path, name}) => {
  const router = useRouter();
  return (
    <Link href={`${path}`}>
      <a
        className={`text-lg text-font-primary ${
          router.pathname === path ? "font-medium" : "font-light"
        } px-4`}
      >
        {name}
      </a>
    </Link>
  );
};
