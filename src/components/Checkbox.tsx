import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface TCheckbox {
  id:string;
  label: string;
  className?: string;
}
type checkboxProps = TCheckbox & ComponentProps<"input">;

export function CheckBox({ id,label, className, ...props }: checkboxProps) {
  return (
    <div className="flex flex-row items-center space-x-2 py-1">
      <input id={id} {...props} type="checkbox" />
      <label htmlFor={id} className={cn("", className)}>{label}</label>
    </div>
  );
}

