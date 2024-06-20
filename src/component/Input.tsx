import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  { title: string; name: string }
>((props, ref) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={props.name}
          className="block text-sm mb-2 dark:text-white"
        >
          {props.title}
        </label>
      </div>
      <div className="relative">
        <input
          id={props.name}
          type={props.name}
          name={props.name}
          ref={ref}
          className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
          required
        />
      </div>
    </div>
  );
});

export default Input;
