import React from "react";
import { twMerge } from "tailwind-merge";

type InputProps = {
  [key: string]: any;
  title: string;
  name: string;
  type?: string;
  divClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    title,
    name,
    type = "text",
    divClassName,
    labelClassName,
    inputClassName,
    ...rest
  }) => {
    return (
      <div className={twMerge("flex flex-col mt-10", divClassName)}>
        <label htmlFor={name} className={twMerge("block", labelClassName)}>
          {title}
        </label>
        <input
          className={twMerge(
            "py-2 px-2 block w-full border-gray-400 border-2 rounded-sm text-sm focus:border-primary focus:ring-primary",
            inputClassName
          )}
          id={name}
          type={type}
          name={name}
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
