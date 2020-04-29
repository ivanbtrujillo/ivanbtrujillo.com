export const generateComment = ({
  date,
  user,
  text,
}: {
  date: string;
  user: { name: string; picture: string };
  text: string;
}) => `---
date: "${date}"
user: "${user.name}"
userPicture: "${user.picture}"
---

${text}
    `;
