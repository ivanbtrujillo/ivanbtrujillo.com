type PostTitleProps = {
  children: string;
};

export const PostTitle: React.FC<PostTitleProps> = ({children}) => (
  <h2 className="text-3xl leading-9 font-extrabold text-font-remark sm:text-4xl sm:leading-10 mb-2">
    {children}
  </h2>
);
