import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { FiCalendar } from "react-icons/fi";

type PostDateProps = {
  dateString: string;
};

export const PostDate: React.SFC<PostDateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <div className="flex flex-row text-font-primary">
      <FiCalendar className="ml-1 mr-1 mt-1" />

      <time dateTime={dateString}>
        {format(date, "d LLLL, yyyy", { locale: es })}
      </time>
    </div>
  );
};
