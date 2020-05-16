import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

type PostDateProps = {
  dateString: string;
};

export const PostDate: React.SFC<PostDateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <p className="text-sm leading-5 text-font-ternary">
      <time dateTime={dateString}>
        {format(date, "d LLLL, yyyy", { locale: es })}
      </time>
    </p>
  );
};
