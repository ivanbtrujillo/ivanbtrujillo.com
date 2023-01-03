import Link, {LinkProps} from "next/link";

type LinkBtnProps = {
  children: React.ReactChild;
} & LinkProps;

export const LinkBtn: React.FC<LinkBtnProps> = ({children, ...props}) => (
  <Link {...props}>
    <a className="flex justify-center items-center px-6 py-4 w-48  rounded-sm text-base leading-6 bg-background-secondary text-white hover:bg-gray-600 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
      {children}
    </a>
  </Link>
);
