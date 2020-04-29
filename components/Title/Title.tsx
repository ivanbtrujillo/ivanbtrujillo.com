type TitleProps = {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
};

export const Title: React.SFC<TitleProps> = ({ children, className }) => {
  return (
    <h1
      className={`text-xl font-semibold text-gray-800 mb-4   ${
        className || ""
      }`}
    >
      {children}
    </h1>
  );
};
