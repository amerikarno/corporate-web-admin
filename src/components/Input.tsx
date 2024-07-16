import React from "react";

type InputProps = {
  title: string;
  name: string;
  type?: string;
  [key: string]: any;
  autofocus?: boolean;
  errors?: boolean;
  errorsMsg?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ title, name, type = "text", autofocus, errors, errorsMsg, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="block">
          {title}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          ref={ref}
          className="py-2 px-2 block w-full border-gray-400 border-2 rounded-sm text-sm focus:border-primary focus:ring-primary"
          autoFocus={autofocus}
          {...rest}
        />
        {errors && <p className="text-red-500">{errorsMsg}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
