import React from "react";

interface InputProps {
  title: string;
  name: string;
}
function Input({ title, name }: InputProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="block text-sm mb-2 dark:text-white">
          {title}
        </label>
      </div>
      <div className="relative">
        <input
          type={name}
          id={name}
          name={name}
          className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
          required
        />
      </div>
    </div>
  );
}

export default Input;
