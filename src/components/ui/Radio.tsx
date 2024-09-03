import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface TCheckbox {
  id: string;
  label: string;
  className?: string;
  type?: string;
}
type checkboxProps = TCheckbox & ComponentProps<"input">;

export function RadioCheckBox({
  id,
  label,
  className,
  type = "checkbox",
  ...props
}: checkboxProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <input id={id} {...props} type={type} className="opacity-0 absolute" />
      <label htmlFor={id} className="relative pl-6 cursor-pointer">
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-400 rounded-full bg-white"></span>
        {label}
      </label>
    </div>
  );
}
