type UserProps = {
  user: { name: string; lastName: string; image: string };
  className?: string;
};

export const User: React.SFC<UserProps> = ({ user, className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <img
      src={user.image}
      className="w-48 h-48 rounded-full border-4 border-white object-cover"
      alt={user.name}
    />
    <h2 className="text-2xl tracking-tight leading-10 mt-2 font-extrabold text-font-primary sm:text-3xl sm:leading-none md:text-4xl">
      {user.name}

      <span className="text-font-secondary ml-1">{user.lastName}</span>
    </h2>
  </div>
);
