import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";

type PostDateProps = {
  dateString: string;
};

export const PostDate: React.SFC<PostDateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <p className="text-sm leading-5 text-gray-700">
      <time dateTime={dateString}>
        {format(date, "d LLLL, yyyy", { locale: enUS })}
      </time>
    </p>
  );
};
