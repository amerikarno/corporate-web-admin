import React from 'react'
import { twMerge } from "tailwind-merge";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from 'react';
interface DropboxProps {
    onDropdownSelect: (option: string) => void;
}
const Dropbox: React.FC<DropboxProps> = ({ onDropdownSelect }) => {
    const [isDropDown,setIsDropDown] = useState<boolean>(false);
    const [dropDownChoosed,setDropDownChoosed] = useState<string>("IDCard or Passport");
    const handleDropdownbtn = () =>{
        setIsDropDown(!isDropDown)
    }
    const handleSelect = (choice:string) => {
        setDropDownChoosed(choice);
        setIsDropDown(false);
        onDropdownSelect(choice);
    };
  return (
  <>
    <button id="dropdownDefaultButton" 
            onClick={handleDropdownbtn} 
            data-dropdown-toggle="dropdown" 
            className="w-full justify-between relative
            text-white bg-gray-900 hover:bg-gray-950 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
            text-center inline-flex items-center dark:bg-gray-600 dark:hover:gray-blue-700 dark:focus:ring-gray-800" 
            type="button">{dropDownChoosed || "IDCard or Passport"} <IoIosArrowDropdown className="text-2xl" />
    </button>
    <div id="dropdown" className={`z-40 ${isDropDown ? ' ' : 'hidden'} max-w-64 absolute bg-neutral-200 divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li onClick={()=>handleSelect("IDCard")}>
            <a className="border-t block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">CardID</a>
        </li>
        <li onClick={()=>handleSelect("Passport")}>
            <a className="border-t block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Passport</a>
        </li>
        </ul>
    </div>
</>  
  )
}

export default Dropbox
