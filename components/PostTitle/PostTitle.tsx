type PostTitleProps = {
  children: string;
};

export const PostTitle: React.SFC<PostTitleProps> = ({ children }) => (
  <h2 className="text-3xl leading-9 font-extrabold text-font-secondary sm:text-4xl sm:leading-10 mb-2">
    {children}
  </h2>
);
