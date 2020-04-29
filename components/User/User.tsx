type UserProps = {
  user: { name: string; lastName: string };
  imageUrl: string;
  className?: string;
};

export const User: React.SFC<UserProps> = ({ user, imageUrl, className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <img
      src={imageUrl}
      className="w-48 h-48 rounded-full border-4 border-white object-cover"
      alt={user.name}
    />
    <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
      {user.name}

      <span className="text-blue-800 ml-1">{user.lastName}</span>
    </h2>
  </div>
);
