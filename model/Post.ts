export type PostType = {
  id: string;
  img: string;
  title: string;
  date: string;
  content: string;
  summary: string;
  comments_url?: string;
};

export type PostResponseType = {
  number: number;
  title: string;
  body: string;
  comments_url?: string;
  author_association: "OWNER" | "NONE";
  user: {
    login: string;
  };
};
