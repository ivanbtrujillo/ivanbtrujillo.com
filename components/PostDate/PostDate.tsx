import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

export const PostDate = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <p className="text-sm leading-5 text-gray-700">
      <time dateTime={dateString}>
        {format(date, "d LLLL, yyyy", { locale: es })}
      </time>
    </p>
  );
};
