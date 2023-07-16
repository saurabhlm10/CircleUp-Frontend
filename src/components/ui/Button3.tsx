import { ButtonHTMLAttributes, FC } from "react";
import { ColorRing } from "react-loader-spinner";

interface Button3Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  showCheckmark?: boolean;
  text: string;
  children?: React.ReactNode;
}

const Button3: FC<Button3Props> = ({
  isLoading,
  showCheckmark,
  text,
  children,
  ...props
}) => {
  return (
    <button
      className="mt-6 relative  h-10 w-24 font-medium group flex flexirow items-center justify-center cursor-pointer"
      disabled={isLoading || showCheckmark}
      {...props}
    >
      <span
        className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#4CADDA] group-hover:-translate-x-0 group-hover:-translate-y-0 ` + 
        `${
          (isLoading || showCheckmark) ? "-translate-x-0 -translate-y-0" : ""
        }`}
      ></span>
      <span
        className={`absolute inset-0 w-full h-full  border-2 border-[#4CADDA] group-hover:bg-[#4CADDA]
${isLoading || showCheckmark ? "bg-[#4CADDA]" : "bg-white"}
${isLoading || showCheckmark ? "bg-[#4CADDA]" : "bg-white"}
`}
      ></span>
      <span className="relative text-black group-hover:text-white font-display font-semibold">
        {isLoading || showCheckmark ? (
          <div>
            {isLoading && (
              <span className="relative w-full">
                <span className=" flex flex-row justify-center items-center transition-all duration-1000">
                  <ColorRing
                    visible={true}
                    height={`${true ? "32" : "0"}`}
                    width={`${true ? "32" : "0"}`}
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                    ]}
                  />
                </span>
              </span>
            )}
            {showCheckmark && (
              <span className="h-[30px] w-[30px] text-white flex justify-center items-center">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="8 9 35 35"
                >
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </span>
            )}
          </div>
        ) : (
          <p>
            {children}
            {text}
          </p>
        )}
      </span>
    </button>
  );
};

export default Button3;
