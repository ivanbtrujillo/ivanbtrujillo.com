type HeaderProps = {
  children: React.ReactChild | React.ReactChild[];
};

export const Header: React.FC<HeaderProps> = ({children}) => (
  <header className="bg-background-accent z-50 sticky top-0 items-center border-b border-border-secondary p-4 text-gray-300 text-center ">
    {children}
  </header>
);
