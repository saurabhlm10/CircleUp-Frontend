import { ButtonHTMLAttributes, FC } from "react";

interface Button2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  showCheckmark?: boolean;
  text: string;
  children?: React.ReactNode;
}

const Button2: FC<Button2Props> = ({
  isLoading,
  showCheckmark,
  text,
  children,
  ...props
}) => {
  return (
    <button
      className=" relative  h-10 w-28 rounded-lg font-medium group flex flex-row items-center justify-center "
      {...props}
    >
      <span
        className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6B4892] group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg `}
      ></span>
      <span
        className={`absolute inset-0 w-full h-full  border-2 border-white group-hover:bg-[#6B4892] bg-blue-500 rounded-lg
`}
      ></span>
      <span className="relative text-white group-hover:text-white font-display font-semibold">
        {children}
        {text}
      </span>
    </button>
  );
};

export default Button2;
