import React from "react";

type InputProps = {
  title: string;
  name: string;
  type?: string;
  [key: string]: any;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ title, name, type = "text", ...rest }, ref) => {
    return (
      <div className="flex flex-col mt-10">
        <label htmlFor={name} className="block">
          {title}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          ref={ref}
          className="py-2 px-2 block w-full border-gray-400 border-2 rounded-sm text-sm focus:border-primary focus:ring-primary"
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
