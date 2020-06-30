export type CommentType = {
  id: string;
  userPicture: string;
  user: string;
  date: string;
  content: string;
};

export type CommentResponseType = Array<{ body: string }>;
