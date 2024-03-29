type TitleProps = {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
};

export const Title: React.FC<TitleProps> = ({children, className}) => {
  return (
    <h1
      className={`text-xl font-semibold text-font-primary mb-4   ${
        className || ""
      }`}
    >
      {children}
    </h1>
  );
};
