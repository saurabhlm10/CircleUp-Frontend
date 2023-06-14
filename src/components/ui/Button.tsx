import { ButtonHTMLAttributes, FC } from "react";
import { ColorRing } from "react-loader-spinner";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  showCheckmark?: boolean;
}

const Button: FC<ButtonProps> = ({ isLoading, showCheckmark }) => {
  return (
    <button
      className="mt-2 text-center  relative inline-block  text-lg group w-full transition-all duration-1000 "
      //   onClick={onCreateAccount}
      disabled={isLoading}
    >
      <span
        className={`relative z-10 block px-5 py-3 overflow-hidden font-bold leading-tight text-white transition-colors duration-300 ease-out border-2 border-white rounded-lg group-hover:text-white ${
          (isLoading || showCheckmark) && "text-white"
        }`}
      >
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-blue-500"></span>
        <span
          className={`absolute left-0 w-full h-[450px] transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#6B4892] group-hover:-rotate-180 ${
            (isLoading || showCheckmark) && "-rotate-180"
          } ease`}
        ></span>
        <span className=" relative flex flex-row justify-center transition-all duration-1000 items-center  ">
          <span
            className={`transition-all duration-300 ${
              (isLoading || showCheckmark) && "-ml-6"
            }`}
          >
            CREATE ACCOUNT
          </span>
          {showCheckmark && (
            <span className="relative">
              <span className="absolute  -top-[15px] left-0 h-[30px] w-[30px] text-white flex items-center">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="2 8 40 40"
                >
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </span>
            </span>
          )}

          {isLoading && (
            <span className="relative ">
              <span className=" absolute top-0 left-0 bottom-0 flex items-center transition-all duration-1000">
                <ColorRing
                  visible={true}
                  height={`${isLoading ? "35" : "0"}`}
                  width={`${isLoading ? "35" : "0"}`}
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
        </span>
      </span>
      <span
        className={`absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-[#6B4892] rounded-lg group-hover:mb-0 group-hover:mr-0 ${
          (isLoading || showCheckmark) && "-mb-0 -mr-0"
        }`}
        data-rounded="rounded-lg"
      ></span>
    </button>
  );
};

export default Button;
