type ParagraphProps = {
  children: string;
  className?: string;
};

export const Paragraph: React.SFC<ParagraphProps> = ({
  children,
  className,
}) => (
  <p
    className={`mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg  md:mt-5 lg:mx-0 ${className}`}
  >
    {children}
  </p>
);
