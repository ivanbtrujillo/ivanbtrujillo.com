type ButtonProps = {
  children: React.ReactChild;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Button: React.SFC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  className,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={` inline-flex items-center disabled:opacity-50  justify-center  border border-transparent text-base leading-6 font-medium rounded-md  focus:outline-none transition ease-in-out duration-150 ${className}`}
  >
    {children}
  </button>
);
