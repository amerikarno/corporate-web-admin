import React from "react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TInputField = {
  id: string;
  label: string;
  inputClassName?: string;
  labelClassName?: string;
  type?: string;
};

type TInputFieldProps = TInputField & ComponentProps<"input">;

// export const Input = ({
//   id,
//   label,
//   inputClassName,
//   labelClassName,
//   type = "text",
//   ...props
// }: TInputFieldProps) => {
//   return (
//     <div className="relative w-full">
//       <input
//         type={type}
//         className={twMerge(
//           "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-600 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer",
//           inputClassName
//         )}
//         aria-describedby="outlined_success_help"
//         placeholder=" "
//         id={id}
//         {...props}
//       />
//       <label
//         htmlFor={id}
//         className={twMerge(
//           "absolute text-sm text-gray-600 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
//           labelClassName
//         )}
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

// export default Input;

const Input = React.forwardRef<HTMLInputElement, TInputFieldProps>(
  (
    { id, label, inputClassName, labelClassName, type = "text", ...props },
    ref
  ) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={twMerge(
            "block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary bg-transparent rounded-lg border border-secondary appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-secondary peer",
            inputClassName
          )}
          aria-describedby="outlined_success_help"
          placeholder=""
          id={id}
          {...props}
          ref={ref}
        />
        <label
          htmlFor={id}
          className={twMerge(
            "absolute text-sm text-primary dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
