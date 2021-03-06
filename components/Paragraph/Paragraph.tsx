type ParagraphProps = {
  children: string;
  className?: string;
};

export const Paragraph: React.SFC<ParagraphProps> = ({
  children,
  className,
}) => (
  <p
    className={`mt-3 text-base sm:mt-5 text-font-primary sm:text-lg font-light md:mt-5 lg:mx-0 ${className}`}
    style={{ whiteSpace: "pre-wrap" }}
  >
    {children}
  </p>
);
