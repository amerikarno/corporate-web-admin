import { ComponentProps, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

type DropdownProps<T> = {
  onDropdownSelect: (option: T | null) => void;
  items: T[];
  className?: string;
};

type TDropdownProps = ComponentProps<"button"> & DropdownProps<any>;

export function Dropdown<T extends Record<string, any>>({
  onDropdownSelect,
  items,
  className,
  ...props
}: TDropdownProps) {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("Select");

  const handleDropdownbtn = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSelect = (choice: T | null) => {
    choice !== null
      ? setDropDownChoosed(choice.value)
      : setDropDownChoosed("Select");
    setIsDropDown(false);
    onDropdownSelect(choice);
  };

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        onClick={handleDropdownbtn}
        data-dropdown-toggle="dropdown"
        className={twMerge(
          "w-full justify-between text-white bg-gray-900 hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:gray-blue-700 dark:focus:ring-gray-800",
          className
        )}
        type="button"
        {...props}
      >
        {dropDownChoosed} <IoIosArrowDropdown className="text-2xl" />
      </button>
      <div
        id="dropdown"
        className={`z-40 ${
          isDropDown ? "" : "hidden"
        } max-w-66 absolute bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700`}
      >
        <ul
          className="border-2 py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li onClick={() => handleSelect(null)}>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white h-8"></a>
          </li>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
