import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  { title: string; name: string }
>((props, ref) => {
  return (
    <>
      <div className="flex flex-col mt-10 ">
        <label
          htmlFor={props.name}
          className="block "
        >
          {props.title}
        </label>
      {/* </div>
      <div className="relative"> */}
        <input
          id={props.name}
          type={props.name}
          name={props.name}
          ref={ref}
          className="py-2 px-2 block w-full border-gray-400 border-2 rounded-sm text-sm focus:border-primary focus:ring-primary "
          required
        />
      </div>
    </>
  );
});

export default Input;
