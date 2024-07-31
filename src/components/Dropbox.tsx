import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
interface DropboxProps {
  onDropdownSelect: (option: string) => void;
}
const Dropbox: React.FC<DropboxProps> = ({ onDropdownSelect }) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("ID");
  const handleDropdownbtn = () => {
    setIsDropDown(!isDropDown);
  };
  const handleSelect = (choice: string) => {
    setDropDownChoosed(choice);
    setIsDropDown(false);
    onDropdownSelect(choice);
  };
  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        onClick={handleDropdownbtn}
        data-dropdown-toggle="dropdown"
        className="w-full justify-between
            text-white bg-gray-900 hover:bg-gray-950 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
            text-center inline-flex items-center dark:bg-gray-600 dark:hover:gray-blue-700 dark:focus:ring-gray-800"
        type="button"
      >
        {dropDownChoosed} <IoIosArrowDropdown className="text-2xl" />
      </button>
      <div
        id="dropdown"
        className={`z-40 ${
          isDropDown ? " " : "hidden"
        } max-w-66 absolute bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700`}
      >
        <ul
          className="border-black border-2 py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li onClick={() => handleSelect("ID")}>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              ID
            </a>
          </li>
          <li onClick={() => handleSelect("Passport")}>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Passport
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropbox;
