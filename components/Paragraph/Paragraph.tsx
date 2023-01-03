type ParagraphProps = {
  children: string;
  className?: string;
};

export const Paragraph: React.FC<ParagraphProps> = ({children, className}) => (
  <p
    className={`text-base -mt-6 text-font-primary sm:text-lg font-light lg:mx-0 ${className}`}
    style={{whiteSpace: "pre-wrap"}}
  >
    {children}
  </p>
);
